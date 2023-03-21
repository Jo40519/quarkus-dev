package io.githbu.Jo40519.quarkussocial.domain;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name = "posts")
@Data
public class Posts {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    
    @Column(name = "post_text")
    private String posts_text;

    @Column(name = "date_time")
    private LocalDateTime date_time;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    

    @PrePersist
    public void prePersist() {
        setDate_time(LocalDateTime.now());
    }
}
