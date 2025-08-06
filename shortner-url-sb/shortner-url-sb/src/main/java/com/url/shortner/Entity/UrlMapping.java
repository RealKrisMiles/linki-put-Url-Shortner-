package com.url.shortner.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UrlMapping {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String originalUrl;
    private String shortUrl;
    private int clickCount =0;
    private LocalDateTime createDate;

    @ManyToOne
    @JoinColumn(name="user_id")// fk linking
    private User user;

    @OneToMany(mappedBy ="urlMapping")
    private List<ClickEvent> clickEvents;


}
