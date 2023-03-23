package io.githbu.Jo40519.quarkussocial.rest.dto;

import java.time.LocalDateTime;

import io.githbu.Jo40519.quarkussocial.domain.Posts;
import lombok.Data;

@Data
public class PostResponse {
    private String text;
    private LocalDateTime date_time;

    public static PostResponse fromEntity(Posts postResponse) {
        var response = new PostResponse();
        response.setText(postResponse.getPosts_text());
        response.setDate_time(postResponse.getDate_time());
        return response;
    }
}
