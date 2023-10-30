package io.githbu.Jo40519.quarkussocial.rest;

import java.util.List;
import java.util.stream.Collectors;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.websocket.server.ServerEndpoint;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.HeaderParam;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
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

    PanacheQuery<Posts> query;

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
        return Response.status(Response.Status.CREATED).entity(post).build();
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

        if (userId.equals(followerId)) {
            // O próprio usuário está visualizando seus posts, não há restrições
            this.query = postRepository.find("user", Sort.by("date_time", Sort.Direction.Descending), user);
        } else {
            boolean follows = this.followerRepository.follows(follower, user);
            if (!follows) {
                return Response.status(Response.Status.FORBIDDEN).entity("Você não pode ver os posts deste usuário")
                        .build();
            }
        }


        this.query = postRepository.find("user", Sort.by("date_time", Sort.Direction.Descending), user);

        List<Posts> listPost = this.query.list();

        List<PostResponse> postResponseList = listPost.stream().map(post -> PostResponse.fromEntity(post))
                .collect(Collectors.toList());
        
        return Response.ok(postResponseList).build();
    }

    @DELETE
@Path("/{postId}")
@Transactional
public Response deletePost(@PathParam("usersId") Long userId, @PathParam("postId") Long postId) {
    User user = userRespository.findById(userId);
    if (user == null) {
        return Response.status(Response.Status.NOT_FOUND).entity("Usuário não encontrado").build();
    }

    Posts post = postRepository.findById(postId);
    if (post == null) {
        return Response.status(Response.Status.NOT_FOUND).entity("Post não encontrado").build();
    }

    // Verifique se o post pertence ao usuário
    if (!post.getUser().equals(user)) {
        return Response.status(Response.Status.FORBIDDEN).entity("Você não pode excluir este post").build();
    }

    postRepository.delete(post);
    return Response.status(Response.Status.NO_CONTENT).entity(post.getPosts_text()).build();
}

@PUT
@Path("/{postId}")
@Transactional
public Response editPost(@PathParam("usersId") Long userId, @PathParam("postId") Long postId, CreatePostRequest postRequest) {
    User user = userRespository.findById(userId);
    if (user == null) {
        return Response.status(Response.Status.NOT_FOUND).entity("Usuário não encontrado").build();
    }

    Posts post = postRepository.findById(postId);
    if (post == null) {
        return Response.status(Response.Status.NOT_FOUND).entity("Post não encontrado").build();
    }

    // Verifique se o post pertence ao usuário
    if (!post.getUser().equals(user)) {
        return Response.status(Response.Status.FORBIDDEN).entity("Você não pode editar este post").build();
    }

    // Atualize o texto do post com o novo texto da solicitação
    post.setPosts_text(postRequest.getText());

    postRepository.persist(post); // Salve as alterações no post

    return Response.ok(PostResponse.fromEntity(post)).build();
}

}
