package io.githbu.Jo40519.quarkussocial.repository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.enterprise.context.ApplicationScoped;

import io.githbu.Jo40519.quarkussocial.domain.Followers;
import io.githbu.Jo40519.quarkussocial.domain.User;
import io.quarkus.hibernate.orm.panache.PanacheQuery;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import io.quarkus.panache.common.Parameters;

@ApplicationScoped
public class FollowerRepository implements PanacheRepository<Followers> {
    
    public boolean follows (User follower, User user) {
        Map<String, Object> params = Parameters.with("follower", follower).and("user", user).map();
        PanacheQuery<Followers> query = find("follower = :follower and user = :user", params);
        Optional<Followers> result = query.firstResultOptional();

        return result.isPresent();
    }

    public List<Followers> findByUser(Long userId) {
        PanacheQuery<Followers> query = find("user.id", userId);
        return query.list();
    }

    public void deleteByFollowerAndUser(Long followerId, Long userId) {
        var params = Parameters.with("userId", userId).and("followerId", followerId).map();
        delete("follower.id = :followerId and user.id = :userId", params);
    }
}
