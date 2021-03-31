package ch.fhnw.lst.sipapi.service;

import ch.fhnw.lst.sipapi.exception.ResourceNotFoundException;
import ch.fhnw.lst.sipapi.model.Image;
import ch.fhnw.lst.sipapi.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ImageServiceImpl extends ImageService {

    @Autowired
    private ImageRepository repository;

    @Override
    public Image findById(Long id){
        repository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("no such Image with id "+id));
        return repository.findById(id).get();
    }
}
