package io.githbu.Jo40519;

import org.hamcrest.Matchers;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import io.githbu.Jo40519.quarkussocial.domain.Followers;
import io.githbu.Jo40519.quarkussocial.domain.Posts;
import io.githbu.Jo40519.quarkussocial.domain.User;
import io.githbu.Jo40519.quarkussocial.repository.FollowerRepository;
import io.githbu.Jo40519.quarkussocial.repository.PostRepository;
import io.githbu.Jo40519.quarkussocial.repository.UserRepository;
import io.githbu.Jo40519.quarkussocial.rest.PostsResource;
import io.githbu.Jo40519.quarkussocial.rest.dto.CreatePostRequest;
import io.quarkus.test.common.http.TestHTTPEndpoint;
import io.quarkus.test.junit.QuarkusTest;
import io.restassured.http.ContentType;

import static io.restassured.RestAssured.given;

import javax.inject.Inject;
import javax.transaction.Transactional;

@QuarkusTest
@TestHTTPEndpoint(PostsResource.class)
public class PostResourceTest {

    @Inject
    UserRepository userRepository;
    @Inject
    FollowerRepository followerRepository;
    @Inject
    PostRepository postRepository;
    Long userID;
    Long userNotFollowerId;
    Long userFollowerId;

    @BeforeEach
    @Transactional
    public void setup() {
        // Usuário padrão dos testes
        var user = new User();
        user.setAge(30);
        user.setName("Fulano");

        userRepository.persist(user);
        userID = user.getId();

        //Criada a postagem do usuário
        Posts post = new Posts();
        post.setPosts_text("Hello");
        post.setUser(user);
        postRepository.persist(post);

        //Usuário que não segue ninguém
        var userNotFollower = new User();
        userNotFollower.setAge(33);
        userNotFollower.setName("Cicrano");

        userRepository.persist(userNotFollower);
        this.userNotFollowerId = userNotFollower.getId();


        //Usuário seguidor
        var userFollower = new User();
        userFollower.setAge(33);
        userFollower.setName("Cicrano");

        userRepository.persist(userFollower);
        this.userFollowerId = userFollower.getId();

        Followers follower = new Followers();
        follower.setFollower(userFollower);

        this.followerRepository.persist(follower);
    }

    @Test
    @DisplayName("Deve criar um post de um usuário")
    public void creatPostTest() {

        var postRequest = new CreatePostRequest();
        postRequest.setText("Olá mundo");

        var userId = this.userID;

        given().contentType(ContentType.JSON)
                .body(postRequest)
                .pathParam("usersId", userId).when().post().then().statusCode(201);
    }

    @Test
    @DisplayName("Deve retornar um erro")
    public void cratePostError() {
        var postRequest = new CreatePostRequest();
        postRequest.setText("Texto");

        var usuarioInexistente = 9999;

        given().contentType(ContentType.JSON)
                .body(postRequest)
                .pathParam("usersId", usuarioInexistente)
                .when().post().then().statusCode(404);
    }

    @Test
    @DisplayName("Deve retornar 404 quando o usuário não existir")
    public void listPostUserNotFoundTest() {
        var inexistentUserId = 9999;
        given().pathParam("usersId", inexistentUserId).when().get().then().statusCode(404);
    }

    @Test
    @DisplayName("Deve retornar 400 quando o usuário não existir")
    public void listPostHeaderNotSendTest() {
        given().pathParam("usersId",
                userID).when().get().then().statusCode(400).body(Matchers.is("Você esqueceu de algo"));

    }

    @Test
    @DisplayName("Deve retornar 400 quando o seguidor não existir")
    public void listPostFollowerNotFoundTest() {
        var inexistentFollower = 9999;
        given().pathParam("usersId", userID).header("followerId", inexistentFollower).when().get().then()
                .statusCode(404).body(Matchers.is("Seguidor inexistente"));

    }

    @Test
    @DisplayName("Deve retornar 403 quando não for um seguidor")
    public void listPostNoAFollowerTest() {
        given().pathParam("usersId", userID).header("followerId", userNotFollowerId).when().get().then()
        .statusCode(403).body(Matchers.is("Você não pode ver os posts deste usuário"));
    }

    @Test
    @DisplayName("Deve retornar os posts")
    public void listPostsTest() {

        given().contentType(ContentType.JSON).pathParam("usersId", userID).header("followerId", userFollowerId).when().get().then()
        .statusCode(403).body("size()", Matchers.is(0));

    }
}
