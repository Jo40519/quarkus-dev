package io.githbu.Jo40519.quarkussocial.rest.dto;

import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.ConstraintViolation;
import javax.ws.rs.core.Response;

import lombok.Data;


@Data
public class ResponseError {
    public static final int UNPROCESSABLE_ENTITY_STATUS = 422;
    private String messages;
    private Collection<FieldError> errors;

    public ResponseError (String messages, Collection<FieldError> errors) {
        this.messages = messages;
        this.errors = errors;
    }

    
    public static <T> ResponseError creationFromValidation(Set<ConstraintViolation<T>> violations) {
        List<FieldError> errors = violations.
        stream().
        map(cv -> new FieldError(cv.getPropertyPath().toString(), cv.getMessage()) ).collect(Collectors.toList());

        String message = "Validation Error";

        var responseError = new ResponseError(message, errors);

        return responseError;
    }

    public Response withStatusCode(int code) {
        return Response.status(code).entity(this).build();
    }
}


