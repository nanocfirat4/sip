package ch.fhnw.lst.sipapi.repository;

import ch.fhnw.lst.sipapi.model.Image;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.jupiter.api.Assertions.*;

@RunWith(SpringRunner.class)
@DataJpaTest
class ImageRepositoryTest {

    @Autowired
    ImageRepository repository;

    @Test
    public void ImageRepositorySaveTest(){
        Image douglas = new Image(
                "hitchhiker's guide",
                "~/Betelgeuse/Five",
                "42/fourty/two"
        );
        repository.save(douglas);
        assertNotNull(repository.findAll());
        assertEquals(douglas,repository.findById(1L).get());
    }


}