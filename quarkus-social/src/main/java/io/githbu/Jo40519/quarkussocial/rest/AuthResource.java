package io.githbu.Jo40519.quarkussocial.rest;

import javax.transaction.Transactional;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.eclipse.microprofile.jwt.JsonWebToken;

import com.oracle.svm.core.annotate.Inject;

import io.githbu.Jo40519.quarkussocial.domain.Login;
import io.githbu.Jo40519.quarkussocial.domain.User;
import io.githbu.Jo40519.quarkussocial.repository.AuthenticationRespository;
import io.smallrye.jwt.build.Jwt;
import io.smallrye.jwt.build.JwtClaimsBuilder;
import io.smallrye.jwt.build.JwtSignatureException;

@Path("/auth")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class AuthResource {
    
     @Inject
    AuthenticationRespository authenticationRespository;

    public AuthResource(AuthenticationRespository authenticationRespository) {
        this.authenticationRespository = authenticationRespository; 
    }

    @POST
    @Path("/login")
    @Transactional
    public Response login(Login request) {
        String email = request.getEmail();
        String senha = request.getSenha();

        User user = authenticationRespository.authenticate(email, senha);

        if (user != null) {
            // Autenticação bem-sucedida
            return Response.ok("Login bem-sucedido").entity(user).build();
        } else {
            // Falha na autenticação
            return Response.status(Response.Status.UNAUTHORIZED).entity("Falha na autenticação").build();
        }
    }
}
