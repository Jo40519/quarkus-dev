package io.githbu.Jo40519;

import javax.inject.Inject;
import javax.transaction.Transactional;

import org.hamcrest.Matchers;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;

import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;

import io.githbu.Jo40519.quarkussocial.domain.Followers;
import io.githbu.Jo40519.quarkussocial.domain.User;
import io.githbu.Jo40519.quarkussocial.repository.FollowerRepository;
import io.githbu.Jo40519.quarkussocial.repository.UserRepository;
import io.githbu.Jo40519.quarkussocial.rest.FollowerResource;
import io.githbu.Jo40519.quarkussocial.rest.dto.FollowerRequest;
import io.quarkus.test.common.http.TestHTTPEndpoint;
import io.quarkus.test.junit.QuarkusTest;
import io.restassured.http.ContentType;

import static io.restassured.RestAssured.given;
import static org.junit.jupiter.api.Assertions.assertEquals;

@QuarkusTest
@TestHTTPEndpoint(FollowerResource.class)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class FollowerResourceTest {

    @Inject
    UserRepository userRepository;

    @Inject
    FollowerRepository followerRepository;

    Long userId;
    Long followerId;

    @BeforeEach
    @Transactional
    public void setup() {
        var user = new User();
        user.setName("João");
        user.setAge(22);
        this.userRepository.persist(user);
        this.userId = user.getId();


        var follower = new User();
        follower.setName("Fulano");
        follower.setAge(22);
        this.userRepository.persist(follower);
        this.followerId = follower.getId();


        var followerEntity = new Followers();
        followerEntity.setFollower(follower);
        followerEntity.setUser(user);
        this.followerRepository.persist(followerEntity);
    }

    @Test
    @DisplayName("Não permite que o usuário siga ele mesmo e retornar o código 409")
    @Order(1)
    public void sameUserAsFollowerTest() {
        var body = new FollowerRequest();
        body.setFollowerId(userId);
        given().contentType(ContentType.JSON).body(body).pathParam("userId", userId).when().put().then()
                .statusCode(Response.Status.CONFLICT.getStatusCode()).body(Matchers.is("You can't follow yourself"));
    }


    @Test
    @DisplayName("Quando o usuário não encontra o outro e retornar o código 404")
    @Order(2)
    public void userNotFoundThenTryingToFollowTest() {
        var body = new FollowerRequest();
        var inexistentUserId = 9999;
        body.setFollowerId(userId);
        given().contentType(ContentType.JSON).body(body).pathParam("userId", inexistentUserId).when().put().then()
                .statusCode(Response.Status.NOT_FOUND.getStatusCode());
    }


    @Test
    @DisplayName("Deve seguir um usuário")
    @Order(3)
    public void followUserTest() {
        var body = new FollowerRequest();
        body.setFollowerId(this.followerId);
        given().contentType(ContentType.JSON).body(body).pathParam("userId", userId).when().put().then()
                .statusCode(Response.Status.NO_CONTENT.getStatusCode());
    }


    @Test
    @DisplayName("Quando o usuário não encontra o outro e retornar o código 404")
    @Order(4)
    public void userNotFoundThenListingToFollowTest() {
        var inexistentUserId = 9999;
        given().contentType(ContentType.JSON).pathParam("userId", inexistentUserId).when().get().then()
                .statusCode(Response.Status.NOT_FOUND.getStatusCode());
    }


    @Test
    @DisplayName("Deve listar os seguidores de um usuário")
    @Order(5)
    public void listFollowingTest() {
        var response = given().contentType(ContentType.JSON).pathParam("userId", userId).when().get().then().extract().response();

       var followerCount =  response.jsonPath().get("followerCount");
        assertEquals(200, response.statusCode());
        assertEquals(1, followerCount);
    }


    @Test
    @DisplayName("Deixar de seguir o usuário")
    public void userNotFoundThenUnfollowerAnUserTest() {
        var inexistentUserId = 9999;
        given().contentType(ContentType.JSON).pathParam("userId", inexistentUserId).queryParam("followerId", followerId).when().delete().then()
                .statusCode(Response.Status.NOT_FOUND.getStatusCode());
    }


    @Test
    @DisplayName("Deixar de seguir o usuário")
    public void unfollowUserTest() {
        given().contentType(ContentType.JSON).pathParam("userId", userId).queryParam("followerId", followerId).when().delete().then()
                .statusCode(Response.Status.NO_CONTENT.getStatusCode());
    }
}
