package ch.fhnw.lst.sipapi.repository;

import ch.fhnw.lst.sipapi.model.Image;
import ch.fhnw.lst.sipapi.model.Search_Favorites;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface ImageRepository extends JpaRepository<Image, Long> {}
