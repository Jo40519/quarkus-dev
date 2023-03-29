package io.githbu.Jo40519;

import javax.ws.rs.core.Application;

import org.eclipse.microprofile.openapi.annotations.OpenAPIDefinition;
import org.eclipse.microprofile.openapi.annotations.info.Contact;
import org.eclipse.microprofile.openapi.annotations.info.Info;
import org.eclipse.microprofile.openapi.annotations.info.License;

@OpenAPIDefinition(
    info = @Info(
        title="API quarkus-social",
        version = "1.0",
        contact = @Contact(
            name = "João Vitor Nunes Lobato de Souza",
            url = "",
            email = "jaolobato85@gmail.com"),
        license = @License(
            name = "Apache 2.0",
            url = "https://www.apache.org/licenses/LICENSE-2.0.html"))
)
public class quarkusSocialApplication extends Application {
    
}
