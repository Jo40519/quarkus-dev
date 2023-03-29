package io.githbu.Jo40519;
import static org.junit.jupiter.api.Assertions.*;

import java.net.URL;
import java.util.List;
import java.util.Map;

import org.hamcrest.Matchers;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;

import io.githbu.Jo40519.quarkussocial.domain.User;
import io.githbu.Jo40519.quarkussocial.rest.dto.CreateUserRequest;
import io.githbu.Jo40519.quarkussocial.rest.dto.ResponseError;
import io.quarkus.test.common.http.TestHTTPResource;
import io.quarkus.test.junit.QuarkusTest;
import io.restassured.http.ContentType;

import static io.restassured.RestAssured.given;

@QuarkusTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class UserResourceTese {

    @TestHTTPResource("/users")
    URL apiUrl;
    
    @Test
    @DisplayName("Deve criar um usuário com sucesso")
    @Order(1)
    public void createUserTest() {
        var user = new User();
        user.setName("Fulano");
        user.setAge(30);

        var response = given()
        .contentType(ContentType.JSON)
        .body(user).when()
        .post(this.apiUrl).then()
        .extract().response();
        
        assertEquals(201, response.statusCode());
        assertNotNull(response.jsonPath().getString("id"));
    }

    @Test
    @DisplayName("Deve retornar erro quando json não for válido")
    @Order(2)
    public void createUsertValidationErrorTest () {
            var user = new CreateUserRequest();
            user.setName(null);
            user.setAge(null);

            var response = given().contentType(ContentType.JSON)
            .body(user).when()
            .post(this.apiUrl).then()
            .extract().response();

            assertEquals(ResponseError.UNPROCESSABLE_ENTITY_STATUS, response.getStatusCode());
            assertEquals("Validation Error", response.jsonPath().getString("messages"));

            List<Map<String, String>> errors = response.jsonPath().getList("errors");
            // assertNotNull(errors.get(0).get("message"));
            assertEquals("Age is required", errors.get(0).get("message"));
            assertEquals("Name is required", errors.get(1).get("message"));
    }


    @Test
    @DisplayName("Deve listar todos os usuários")
    @Order(3)
    public void listAllUserTest () {

        given().contentType(ContentType.JSON).when().get(this.apiUrl).then().statusCode(200).body("size()", Matchers.is(1));
    }
}
