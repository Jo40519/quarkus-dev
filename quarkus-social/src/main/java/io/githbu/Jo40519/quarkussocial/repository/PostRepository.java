package io.githbu.Jo40519.quarkussocial.repository;

import javax.enterprise.context.ApplicationScoped;

import io.githbu.Jo40519.quarkussocial.domain.Posts;
import io.quarkus.hibernate.orm.panache.PanacheRepository;

@ApplicationScoped
public class PostRepository implements PanacheRepository<Posts> {
    
}
