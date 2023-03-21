package io.githbu.Jo40519.quarkussocial.repository;

import javax.enterprise.context.ApplicationScoped;

import io.githbu.Jo40519.quarkussocial.domain.User;
import io.quarkus.hibernate.orm.panache.PanacheRepository;


@ApplicationScoped
public class UserRepository implements PanacheRepository<User> {
    
}
