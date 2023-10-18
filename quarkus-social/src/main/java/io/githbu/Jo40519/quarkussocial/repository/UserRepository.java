package io.githbu.Jo40519.quarkussocial.repository;

import javax.enterprise.context.ApplicationScoped;

import io.githbu.Jo40519.quarkussocial.domain.User;
import io.quarkus.hibernate.orm.panache.PanacheRepository;


@ApplicationScoped
public class UserRepository implements PanacheRepository<User> {
    
    // public User findByEmail(String email) {
    //     return find("email", email).firstResult();
    // }

    public User findByEmailAndPassword(String email, String senha) {
        return find("email = ?1 and senha = ?2", email, senha).firstResult();
    }

}
