package io.githbu.Jo40519.quarkussocial.repository;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.enterprise.context.ApplicationScoped;
import javax.persistence.EntityManager;

import org.jboss.resteasy.annotations.Query;

import com.oracle.svm.core.annotate.Inject;

import io.githbu.Jo40519.quarkussocial.domain.Followers;
import io.githbu.Jo40519.quarkussocial.domain.User;
import io.quarkus.hibernate.orm.panache.PanacheQuery;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import io.quarkus.panache.common.Parameters;
import io.quarkus.vertx.web.Param;

@ApplicationScoped
public class FollowerRepository implements PanacheRepository<Followers> {

      @Inject
    EntityManager em;

    public FollowerRepository(EntityManager em) {
        this.em = em;
    }
    
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

    public List<Followers> findFollowingByUser(Long userId) {
        if (this.em == null) {
            // Log ou mensagem de erro aqui
            return Collections.emptyList(); // Ou qualquer ação apropriada
        }
        return this.em.createQuery("SELECT f FROM Followers f WHERE f.user.id = :userId", Followers.class)
                .setParameter("userId", userId)
                .getResultList();
    }

    public List<Followers> findFollowingByFollower(Long followerId) {
        return em.createQuery("SELECT f FROM Followers f WHERE f.follower.id = :followerId", Followers.class)
        .setParameter("followerId", followerId)
        .getResultList();

    };

}
