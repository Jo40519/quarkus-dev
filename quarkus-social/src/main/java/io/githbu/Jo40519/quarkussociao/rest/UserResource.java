package io.githbu.Jo40519.quarkussociao.rest;

import io.githbu.Jo40519.quarkussociao.rest.dto.CreateUserRequest;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/users")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class UserResource {

    @POST
    public Response createUser(CreateUserRequest userRequest) {
        return Response.ok(userRequest).build();
    }


    @GET
    public Response listAllUser() {
        return Response.ok().build();

    }
}
