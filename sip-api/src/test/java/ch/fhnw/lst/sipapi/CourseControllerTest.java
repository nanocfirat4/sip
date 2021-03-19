package ch.fhnw.lst.sipapi;


import ch.fhnw.lst.sipapi.model.Image;
import ch.fhnw.lst.sipapi.service.ImageService;
import org.jboss.resteasy.client.jaxrs.ResteasyClientBuilder;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.keycloak.OAuth2Constants;
import org.keycloak.admin.client.KeycloakBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.web.FilterChainProxy;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import org.testcontainers.containers.BindMode;
import org.testcontainers.containers.GenericContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Testcontainers
@WebAppConfiguration
@SpringBootTest(classes = SpitalprojektApplication.class)//webEnvironment = WebEnvironment.RANDOM_PORT)
public class CourseControllerTest {
  Logger logger = LoggerFactory.getLogger(CourseControllerTest.class);
  @Container
  static GenericContainer<?> keycloakContainer =
    new GenericContainer("jboss/keycloak:12.0.3")
      //.waitingFor(Wait.forHttp("/auth").forStatusCode(200))
      .withExposedPorts(8080)
      .withClasspathResourceMapping("/keycloak.json", "/tmp/keycloak.json", BindMode.READ_ONLY)
      .withEnv(Map.of(
                  "DB_VENDOR", "POSTGRES",
                  "DB_ADDR","keycloakDB",
                  "DB_DATABASE","keycloak",
                  "DB_USER","keycloak",
                  "DB_SCHEMA","public",
                  "DB_PASSWORD","password",
                  "DB_PORT","5432",
                  "KEYCLOAK_USER","admin",
                  "KEYCLOAK_PASSWORD","Pa55w0rd",
                  "KEYCLOAK_IMPORT", "/tmp/keycloak.json"
      ));

    //@Autowired
    private MockMvc mockMvc;
    @Autowired
    private WebApplicationContext wac;

    @MockBean
    private ImageService service;

    @Autowired
    private FilterChainProxy springSecurityFilterChain;

    @BeforeEach
    public void setup() {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(this.wac)
          .addFilter(springSecurityFilterChain).build();
    }
    @Test
    public void findAll() throws Exception {
        Image douglas = new Image(
                "hitchhiker's guide",
                "~/Betelgeuse/Five",
                42, Timestamp.from(Instant.now()));
        List<Image> allImages = Arrays.asList(douglas);
        given(service.findAll()).willReturn(allImages);

        String accessToken = obtainAccessToken("stawiskm", "password");
        mockMvc.perform(get("/api/images")
            .header("Authorization", "Bearer " + accessToken)
            .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$", hasSize(1)))
            .andExpect(jsonPath("$[0].description", is(douglas.getDescription())));
    }

  private String obtainAccessToken(String username, String password) throws Exception {
      String url = String.format("http://%s:%d/auth",
          keycloakContainer.getHost(),
          keycloakContainer.getFirstMappedPort());
      String url2 = "http://localhost:8080/auth";
    logger.info(url2);
    return KeycloakBuilder.builder()
        .serverUrl(url)
        .grantType(OAuth2Constants.PASSWORD)
        .realm("FHNW-LST-MI")
        .clientId("web-app")
        .username(username)
        .password(password)
        .resteasyClient(
            new ResteasyClientBuilder()
                .connectionPoolSize(10).build()
        ).build().tokenManager().getAccessToken().getToken();
  }
}
