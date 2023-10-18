package io.githbu.Jo40519.quarkussocial.rest.dto;

import io.githbu.Jo40519.quarkussocial.domain.Followers;
import io.githbu.Jo40519.quarkussocial.domain.User;
import lombok.Data;

@Data
public class FollowerResponse {
    private long id;
    private String name;
    private User user;

    public FollowerResponse () {
        
    }
    public FollowerResponse (Followers followers) {
        this(followers.getId(), followers.getFollower().getName(), followers.getUser());
    }
    public FollowerResponse (Long id, String name, User user) {
    this.id = id;
    // this.name = name;
    this.user = user;
    }
}
