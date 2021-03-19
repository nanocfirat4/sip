package ch.fhnw.lst.sipapi;

import org.keycloak.adapters.springboot.KeycloakSpringBootProperties;
import org.keycloak.representations.adapters.config.AdapterConfig;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/*
 * Workaround for reading the properties for the keycloak adapter
 */
@Configuration
public class CustomAdapterConfig {
  @Bean
  AdapterConfig adapterConfig(){
     return new KeycloakSpringBootProperties();
  }
}