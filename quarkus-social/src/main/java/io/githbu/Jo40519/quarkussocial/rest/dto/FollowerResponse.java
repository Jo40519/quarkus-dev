package io.githbu.Jo40519.quarkussocial.rest.dto;

import io.githbu.Jo40519.quarkussocial.domain.Followers;
import lombok.Data;

@Data
public class FollowerResponse {
    private long id;
    private String name;

    public FollowerResponse () {
        
    }
    public FollowerResponse (Followers followers) {
        this(followers.getId(), followers.getFollower().getName());
    }
    public FollowerResponse (Long id, String name) {
    this.id = id;
    this.name = name;
    }
}
