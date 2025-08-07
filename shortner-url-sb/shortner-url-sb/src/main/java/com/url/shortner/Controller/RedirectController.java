package com.url.shortner.Controller;

import com.url.shortner.Entity.UrlMapping;
import com.url.shortner.Service.UrlMappingService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class RedirectController {
    private UrlMappingService urlMappingService;


    @GetMapping("/{shorturl}")
    public ResponseEntity<Void> redirect(@PathVariable String shorturl){
        UrlMapping urlMapping = urlMappingService.getOriginalUrl(shorturl);
        if(urlMapping != null){
            HttpHeaders httpHeaders = new HttpHeaders();
            httpHeaders.add("Location",urlMapping.getOriginalUrl());
            return ResponseEntity.status(302).headers(httpHeaders).build();
        }else{
            return ResponseEntity.notFound().build();
        }

    }
}
