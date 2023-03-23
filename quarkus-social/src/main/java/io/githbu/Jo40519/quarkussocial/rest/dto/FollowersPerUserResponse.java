package io.githbu.Jo40519.quarkussocial.rest.dto;

import java.util.List;

import lombok.Data;

@Data
public class FollowersPerUserResponse {
    private Integer followerCount;
    private List<FollowerResponse> content;
}
