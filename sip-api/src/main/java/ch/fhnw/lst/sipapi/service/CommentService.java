package ch.fhnw.lst.sipapi.service;

import ch.fhnw.lst.sipapi.exception.ResourceNotFoundException;
import ch.fhnw.lst.sipapi.model.Comment;
import ch.fhnw.lst.sipapi.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class CommentService {
    @Autowired
    CommentRepository commentRepository;

    public List<Comment> findAll(){

        return commentRepository.findAll();
    }

    public Comment findById(Long id){
        return commentRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("no such Comment with id "+id));
    }
    public Comment save(Comment comment){
        return commentRepository.save(comment);
    }
}
