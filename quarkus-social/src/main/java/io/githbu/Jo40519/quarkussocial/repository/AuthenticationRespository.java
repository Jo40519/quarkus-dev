package io.githbu.Jo40519.quarkussocial.repository;

import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;

import com.oracle.svm.core.annotate.Inject;

import io.githbu.Jo40519.quarkussocial.domain.User;

@ApplicationScoped
public class AuthenticationRespository {
    

    @Inject
    UserRepository userRepository;

    public AuthenticationRespository(UserRepository repository) {
        this.userRepository = repository;
    }

@Transactional
public User authenticate(String email, String senha) {
    return userRepository.findByEmailAndPassword(email, senha);
}
}
