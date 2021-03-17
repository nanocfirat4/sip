package ch.fhnw.lst.sipapi.repository;

import ch.fhnw.lst.sipapi.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ImageRepository extends JpaRepository<Image, Long> {
}
