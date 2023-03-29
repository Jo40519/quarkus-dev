package io.githbu.Jo40519.quarkussocial.rest;

import java.util.List;
import java.util.stream.Collectors;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import io.githbu.Jo40519.quarkussocial.domain.Posts;
import io.githbu.Jo40519.quarkussocial.domain.User;
import io.githbu.Jo40519.quarkussocial.repository.FollowerRepository;
import io.githbu.Jo40519.quarkussocial.repository.PostRepository;
import io.githbu.Jo40519.quarkussocial.repository.UserRepository;
import io.githbu.Jo40519.quarkussocial.rest.dto.CreatePostRequest;
import io.githbu.Jo40519.quarkussocial.rest.dto.PostResponse;
import io.quarkus.hibernate.orm.panache.PanacheQuery;
import io.quarkus.panache.common.Sort;

@Path("/users/{usersId}/posts")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class PostsResource {
    private UserRepository userRespository;
    private PostRepository postRepository;
    private FollowerRepository followerRepository;

    @Inject
    public PostsResource(UserRepository userRepository, PostRepository postRepository,
            FollowerRepository followerRepository) {
        this.userRespository = userRepository;
        this.postRepository = postRepository;
        this.followerRepository = followerRepository;
    }

    @POST
    @Transactional
    public Response savePost(@PathParam("usersId") Long userId, CreatePostRequest postRequest) {
        User user = userRespository.findById(userId);
        if (user == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        Posts post = new Posts();
        post.setPosts_text(postRequest.getText());
        post.setUser(user);

        this.postRepository.persist(post);
        return Response.status(Response.Status.CREATED).build();
    }

    @GET
    public Response listPost(@PathParam("usersId") Long userId, @HeaderParam("followerId") Long followerId) {
        User user = userRespository.findById(userId);
        if (user == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        if (followerId == null) {
            return Response.status(Response.Status.BAD_REQUEST).entity("Você esqueceu de algo").build();
        }

        User follower = this.userRespository.findById(followerId);

        if (follower == null) {
            return Response.status(Response.Status.NOT_FOUND).entity("Seguidor inexistente").build();
        }

        boolean follows = this.followerRepository.follows(follower, user);
        if (!follows) {
            return Response.status(Response.Status.FORBIDDEN).entity("Você não pode ver os posts deste usuário")
                    .build();
        }

        PanacheQuery<Posts> query = postRepository.find("user", Sort.by("date_time", Sort.Direction.Descending), user);

        List<Posts> listPost = query.list();

        List<PostResponse> postResponseList = listPost.stream().map(post -> PostResponse.fromEntity(post))
                .collect(Collectors.toList());
        return Response.ok(postResponseList).build();
    }

}
