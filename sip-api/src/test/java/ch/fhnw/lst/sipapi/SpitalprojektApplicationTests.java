package ch.fhnw.lst.sipapi;

import ch.fhnw.lst.sipapi.model.Image;
import ch.fhnw.lst.sipapi.repository.ImageRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.sql.Timestamp;
import java.time.Instant;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class SpitalprojektApplicationTests {

	@Test
	void contextLoads() {
	}

	@Autowired
	ImageRepository imageRepository;
	@Test
	public void imageRepositorySaveImage(){
		Image douglas = new Image();
		douglas.setDescription("hitchhiker's guide");
		douglas.setThumbnail("~/Betelgeuse/Five");
		int fourtyTwo = 42;
		douglas.setPacs_id(fourtyTwo);
		imageRepository.save(douglas);
		assertNotNull(douglas.getId());
		assertEquals(fourtyTwo,douglas.getPacs_id());
		assertEquals(douglas.getDescription(), "hitchhiker's guide");
		assertEquals(douglas.getThumbnail(), "~/Betelgeuse/Five");
	}

}
