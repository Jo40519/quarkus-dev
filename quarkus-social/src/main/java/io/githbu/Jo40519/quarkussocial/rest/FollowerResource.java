package io.githbu.Jo40519.quarkussocial.rest;

import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.arjuna.ats.internal.jdbc.drivers.modifiers.list;

import io.githbu.Jo40519.quarkussocial.domain.Followers;
import io.githbu.Jo40519.quarkussocial.domain.User;
import io.githbu.Jo40519.quarkussocial.repository.FollowerRepository;
import io.githbu.Jo40519.quarkussocial.repository.UserRepository;
import io.githbu.Jo40519.quarkussocial.rest.dto.FollowerRequest;
import io.githbu.Jo40519.quarkussocial.rest.dto.FollowerResponse;
import io.githbu.Jo40519.quarkussocial.rest.dto.FollowersPerUserResponse;

@Path("/users/{userId}/followers")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class FollowerResource {
    private FollowerRepository followerReposiroty;
    private UserRepository userRepository;

    @Inject
    public FollowerResource(FollowerRepository repositoryFollower, UserRepository repositoryUser) {
        this.followerReposiroty = repositoryFollower;
        this.userRepository = repositoryUser;
    }

    @PUT
    @Transactional
    public Response followUser(@PathParam("userId") Long userId, FollowerRequest followRequest) {

        if(userId.equals(followRequest.getFollowerId())){
            return Response.status(Response.Status.CONFLICT).entity("You can't follow yourself").build();
        }
        User user = this.userRepository.findById(userId);
        if(user == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        User follower = this.userRepository.findById(followRequest.getFollowerId());
        boolean follow = this.followerReposiroty.follows(follower, user);
        if(!follow){
            var entity = new Followers();
            entity.setUser(user);
            entity.setFollower(follower);
            this.followerReposiroty.persist(entity);
        }
        return Response.status(Response.Status.NO_CONTENT).build();
    }

    @GET
    public Response listFollowers(@PathParam("userId") Long userId) {

        User user = this.userRepository.findById(userId);
        if(user == null) {
            return Response.status(Response.Status.NOT_FOUND).entity("Usuário não existente").build();
        }

        List<Followers> list = this.followerReposiroty.findByUser(userId);
        FollowersPerUserResponse objectResponse = new FollowersPerUserResponse();
        objectResponse.setFollowerCount(list.size());

        List<FollowerResponse>  followerList =  list.stream().map(FollowerResponse::new).collect(Collectors.toList());

        objectResponse.setContent(followerList);

        return Response.ok(objectResponse).build();
    }

    @DELETE
    @Transactional
    public Response unfollow(@PathParam("userId") Long userId, @QueryParam("followerId") Long followerId) {
        User user = this.userRepository.findById(userId);
        if(user == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        this.followerReposiroty.deleteByFollowerAndUser(followerId, userId);
        return Response.status(Response.Status.NO_CONTENT).build();
    }
}
