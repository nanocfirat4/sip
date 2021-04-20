package ch.fhnw.lst.sipapi;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.test.context.TestPropertySource;

@AutoConfigureMockMvc
@TestPropertySource(locations = "classpath:src/test/resources/application.properties")
public class SpitalProjektApplicationTest {

    @Test
    void contextLoads(){}
}
