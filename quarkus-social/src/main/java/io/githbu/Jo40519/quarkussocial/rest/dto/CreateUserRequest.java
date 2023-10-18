package io.githbu.Jo40519.quarkussocial.rest.dto;

import javax.validation.constraints.NotBlank;

import javax.validation.constraints.NotNull;

import lombok.Data;


@Data
public class CreateUserRequest {

    @NotBlank(message = "Name is required")
    private String name;

    @NotNull(message = "Age is required")
    private Integer age;

    @NotNull(message = "Email is required")
    private String email;

    @NotNull(message = "Sexo is required")
    private String sexo;

    @NotNull(message = "Senha is required")
    private String senha;
}
