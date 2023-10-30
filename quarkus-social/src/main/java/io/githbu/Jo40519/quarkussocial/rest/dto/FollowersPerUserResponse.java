package io.githbu.Jo40519.quarkussocial.rest.dto;

import java.util.List;

import lombok.Data;

@Data
public class FollowersPerUserResponse {
    private Integer followerCount;
    private Integer FollowingCount;
    private List<FollowerResponse> content;
}
