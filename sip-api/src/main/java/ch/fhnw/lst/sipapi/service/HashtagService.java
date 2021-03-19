package ch.fhnw.lst.sipapi.service;

import ch.fhnw.lst.sipapi.exception.ResourceNotFoundException;
import ch.fhnw.lst.sipapi.model.Hashtag;
import ch.fhnw.lst.sipapi.repository.HashtagRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class HashtagService {
    @Autowired
    HashtagRepository hashtagRepository;

    public List<Hashtag> findAll(){
        return hashtagRepository.findAll();
    }
    public Hashtag findById(Long id){
        return hashtagRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("no such Hashtag with id "+id));
    }
    public Hashtag save(Hashtag hashtag){
        return hashtagRepository.save(hashtag);
    }
}
