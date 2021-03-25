package ch.fhnw.lst.sipapi.controller;

import ch.fhnw.lst.sipapi.model.Comment;
import ch.fhnw.lst.sipapi.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class CommentController {
    @Autowired
    private CommentService commentService;

    @GetMapping("/comment/{id}")
    public Comment findById(@PathVariable Long id){
        return commentService.findById(id);
    }

    @GetMapping("/comment")
    public List<Comment> findAll(){
        return commentService.findAll();
    }

    @PostMapping("/comment")
    public Comment save(@RequestBody Comment comment){
        return commentService.save(comment);
    }

}
