package com.url.shortner.Service;

import com.url.shortner.Dtos.ClickEventDto;
import com.url.shortner.Dtos.UrlMappingDTO;
import com.url.shortner.Entity.ClickEvent;
import com.url.shortner.Entity.UrlMapping;
import com.url.shortner.Entity.User;
import com.url.shortner.Repository.ClickEventRepository;
import com.url.shortner.Repository.UrlMappingRepo;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.stream.Collector;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UrlMappingService {

    private UrlMappingRepo urlRepo;

    private ClickEventRepository clickEventRepository;

    public UrlMappingDTO createShortUrl(String originalUrl, User user) {
        String shortUrl = generateShortUrl();
        UrlMapping urlMapping = new UrlMapping();
        urlMapping.setOriginalUrl(originalUrl);
        urlMapping.setShortUrl(shortUrl);
        urlMapping.setUser(user);
        urlMapping.setCreateDate(LocalDateTime.now());
        UrlMapping savedUrlMapping = urlRepo.save(urlMapping);
        return covertToDto(savedUrlMapping);
    }

    private UrlMappingDTO covertToDto(UrlMapping urlMapping){
        UrlMappingDTO urlMappingDTO = new UrlMappingDTO();
        urlMappingDTO.setShortUrl(urlMapping.getShortUrl());
        urlMappingDTO.setOriginalUrl(urlMapping.getOriginalUrl());
        urlMappingDTO.setId(urlMapping.getId());
        urlMappingDTO.setUsername(urlMapping.getUser().getUsername());
        urlMappingDTO.setClickCount(urlMapping.getClickCount());
        urlMappingDTO.setCreatedDate(urlMapping.getCreateDate());
        return urlMappingDTO;
    }

    private String generateShortUrl() {
        String characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        Random random = new Random();
        StringBuilder shorturl = new StringBuilder(8);
        for (int i =0;i<8;i++){
            shorturl.append(characters.charAt(random.nextInt(characters.length())));
        }
        return shorturl.toString();
    }

    public List<UrlMappingDTO> getUrlsByUser(User user) {
        return urlRepo.findByUser(user).stream().map(this::covertToDto).toList();
    }

    public List<ClickEventDto> getClickEventByDate(String shorturl, LocalDateTime start, LocalDateTime end) {
        UrlMapping urlMapping = urlRepo.findByShortUrl(shorturl);
        if(urlMapping!=null){
            return clickEventRepository.findByUrlMappingAndClickDateBetween(urlMapping,start,end).stream().collect(Collectors.groupingBy(click->click.getClickDate().toLocalDate(),Collectors.counting())).entrySet().stream().map(entry->{
                ClickEventDto clickEventDto = new ClickEventDto();
                clickEventDto.setClickDate(entry.getKey());
                clickEventDto.setCount(entry.getValue());
                return clickEventDto;
            }).collect(Collectors.toList());
        }
        return null;
    }

    public Map<LocalDate, Long> getTotalClicksByUserAndDate(User user, LocalDate start, LocalDate end) {
       List<UrlMapping> urlMapping =  urlRepo.findByUser(user);
       List<ClickEvent> clickEvents = clickEventRepository.findByUrlMappingInAndClickDateBetween(urlMapping,start.atStartOfDay(),end.plusDays(1).atStartOfDay());
       return clickEvents.stream().collect(Collectors.groupingBy(click->click.getClickDate().toLocalDate(),Collectors.counting()));
    }
    @Transactional
    public boolean  deleteByShortUrl(String shortUrl) {
        UrlMapping url = urlRepo.findByShortUrl(shortUrl);
        if(url!=null){
            clickEventRepository.deleteByUrlMapping(url);
            urlRepo.delete(url);

            return true;
        }
        return false;
    }

    public UrlMapping getOriginalUrl(String shorturl) {
         UrlMapping urlMapping = urlRepo.findByShortUrl(shorturl);
         if(urlMapping!=null){
             urlMapping.setClickCount(urlMapping.getClickCount()+1);
             urlRepo.save(urlMapping);

             //record click event
             ClickEvent clickEvent = new ClickEvent();
             clickEvent.setClickDate(LocalDateTime.now());
             clickEvent.setUrlMapping(urlMapping);
             clickEventRepository.save(clickEvent);
         }
            return urlMapping;
    }
}
