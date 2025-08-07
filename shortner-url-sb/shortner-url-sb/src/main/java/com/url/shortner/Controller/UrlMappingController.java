package com.url.shortner.Controller;

import com.url.shortner.Dtos.ClickEventDto;
import com.url.shortner.Dtos.UrlMappingDTO;
import com.url.shortner.Entity.ClickEvent;
import com.url.shortner.Entity.User;
import com.url.shortner.Service.UrlMappingService;
import com.url.shortner.Service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/urls")
@AllArgsConstructor
public class UrlMappingController {
    private UrlMappingService urlMappingService;
    private UserService userService;

    @PostMapping("/shorten")
    public ResponseEntity<UrlMappingDTO>  createShortUrl(@RequestBody Map<String, String > request, Principal principal){
        String originalUrl = request.get("originalUrl");
       User user = userService.findByUsername(principal.getName());
       //cal servicee
        UrlMappingDTO urlMappingDTO = urlMappingService.createShortUrl(originalUrl,user);
        return ResponseEntity.ok(urlMappingDTO);
    }

    @GetMapping("/myurls")
    public ResponseEntity<List<UrlMappingDTO>>  getUserUrls(Principal principal){
        User user = userService.findByUsername(principal.getName());
        List<UrlMappingDTO> url = urlMappingService.getUrlsByUser(user);
        return ResponseEntity.ok(url);
    }

    @GetMapping("/analytics/{shorturl}")
    public ResponseEntity<List<ClickEventDto>>  getUrlAnalytics(@PathVariable String shorturl, @RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate){
        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE_TIME; //2025-08-08T00:00:00
        LocalDateTime start = LocalDateTime.parse(startDate,formatter);
        LocalDateTime end = LocalDateTime.parse(endDate,formatter);
        List<ClickEventDto> clickEventDtos = urlMappingService.getClickEventByDate(shorturl,start,end);
        return ResponseEntity.ok(clickEventDtos);
    }

    @DeleteMapping("/{shorturl}")
    public ResponseEntity<Void> deleteUrl(@PathVariable String shorturl){
        boolean deleted = urlMappingService.deleteByShortUrl(shorturl);
        if(deleted){
            return ResponseEntity.noContent().build();
        }else{
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/totalClicks")
    public ResponseEntity<Map<LocalDate,Long>>  getTotalClickByDate(Principal principal,@RequestParam("startDate") String startDate, @RequestParam("endDate") String endDate){
        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE; //2025-08-08T00:00:00
        User user = userService.findByUsername(principal.getName());
        LocalDate start = LocalDate.parse(startDate,formatter);
        LocalDate end = LocalDate.parse(endDate,formatter);
        Map<LocalDate,Long> totalClicks = urlMappingService.getTotalClicksByUserAndDate(user,start,end);
        return ResponseEntity.ok(totalClicks);
    }
}
