package ch.fhnw.lst.sipapi.service;

import ch.fhnw.lst.sipapi.exception.ResourceNotFoundException;
import ch.fhnw.lst.sipapi.model.Image;
import ch.fhnw.lst.sipapi.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ImageService {
    @Autowired
    ImageRepository imageRepository;

    public List<Image> findAll(){
        return imageRepository.findAll();
    }
    public Image findById(Long id){
        return imageRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("no such course with id "+id));
    }
    public Image save(Image image){
        return imageRepository.save(image);
    }
}
