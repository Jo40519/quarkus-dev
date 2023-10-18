package io.githbu.Jo40519.quarkussocial.rest;

import java.util.Set;

import javax.transaction.Transactional;
import javax.validation.ConstraintViolation;
import javax.validation.Validator;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import io.githbu.Jo40519.quarkussocial.domain.User;
import io.githbu.Jo40519.quarkussocial.repository.UserRepository;
import io.githbu.Jo40519.quarkussocial.rest.dto.CreateUserRequest;
import io.githbu.Jo40519.quarkussocial.rest.dto.ResponseError;
import io.quarkus.hibernate.orm.panache.PanacheQuery;

@Path("/users")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class UserResource {
    private UserRepository repository;
    private Validator validator;

    public UserResource(UserRepository repository, Validator validator) {
        this.repository = repository;
        this.validator = validator;
    }

    @POST
    @Transactional
    public Response createUser(CreateUserRequest userRequest) {

        Set<ConstraintViolation<CreateUserRequest>> violation = validator.validate(userRequest);
        if(!violation.isEmpty()){
            return ResponseError.creationFromValidation(violation).withStatusCode(ResponseError.UNPROCESSABLE_ENTITY_STATUS);
        }

        final User user = new User();
        user.setAge(userRequest.getAge());
        user.setName(userRequest.getName());
        user.setEmail(userRequest.getEmail());
        user.setSexo(userRequest.getSexo());
        user.setSenha(userRequest.getSenha());
        repository.persist(user);
        return Response.status(Response.Status.CREATED.getStatusCode()).entity(user).build();
    }


    @GET
    public Response listAllUser() {
        PanacheQuery<User> query =  repository.findAll();
        return Response.ok(query.list()).build();
    }

    @DELETE
    @Path("{id}")
    @Transactional
    public Response deleteUser(@PathParam("id") Long id) {
        final User user =  repository.findById(id);
        if(user != null) {
            repository.delete(user);
            return Response.noContent().build();
        }
    return Response.status(Response.Status.NOT_FOUND).build();
    }


    @PUT
    @Path("{id}")
    @Transactional
    public Response updateUser(@PathParam("id") long id, CreateUserRequest userData) {
        final User user = repository.findById(id);
        if(user != null) {
            user.setName(userData.getName());
            user.setAge(userData.getAge());
            user.setEmail(userData.getEmail());
            user.setSexo(userData.getSexo());
            user.setSenha(userData.getSenha());
            return Response.noContent().build();
        }

        return Response.status(Response.Status.NOT_FOUND).build();
    }
}
