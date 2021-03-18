package ch.fhnw.lst.sipapi.repository;

import ch.fhnw.lst.sipapi.model.Image;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;


import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class ImageRepositoryTest {

    @Autowired
    ImageRepository imageRepository;

    @Test
    public void save(){
        Image image = new Image();
        image.setDescription("hitchhiker's guide");
        imageRepository.save(image);
        assertNotNull(image.getId());
    }
}