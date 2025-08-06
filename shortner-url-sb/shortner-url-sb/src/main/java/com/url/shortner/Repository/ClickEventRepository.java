package com.url.shortner.Repository;

import com.url.shortner.Entity.ClickEvent;
import com.url.shortner.Entity.UrlMapping;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface ClickEventRepository extends JpaRepository<ClickEvent,Long> {
    List<ClickEvent> findByUrlMappingAndClickDateBetween(UrlMapping mapping, LocalDateTime start,LocalDateTime end);
    List<ClickEvent> findByUrlMappingInAndClickDateBetween(List<UrlMapping> url, LocalDateTime start,LocalDateTime end);
    void deleteByUrlMapping(UrlMapping mapping);

}
