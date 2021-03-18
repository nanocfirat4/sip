package ch.fhnw.lst.sipapi;

import ch.fhnw.lst.sipapi.model.Image;
import ch.fhnw.lst.sipapi.repository.ImageRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.sql.Timestamp;
import java.time.Instant;

@SpringBootApplication
public class SpitalprojektApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpitalprojektApplication.class, args);
	}

	@Bean
	CommandLineRunner commandLineRunner(ImageRepository imageRepository){
		return args -> {
			Image douglas = new Image(
					"hitchhiker's guide",
					"~/Betelgeuse/Five",
					42, Timestamp.from(Instant.now()));
			imageRepository.save(douglas);
		};
	}
}
