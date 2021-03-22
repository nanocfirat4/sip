package ch.fhnw.lst.sipapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SpitalprojektApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpitalprojektApplication.class, args);
	}

/*	@Bean
	CommandLineRunner commandLineRunner(ImageRepository imageRepository){
		return args -> {
			Image douglas = new Image(
					"hitchhiker's guide",
					"~/Betelgeuse/Five",
					42);
			imageRepository.save(douglas);
		};
	}*/
}
