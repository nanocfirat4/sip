package ch.fhnw.lst.sipapi.controller;

import ch.fhnw.lst.sipapi.model.Hashtag;
import ch.fhnw.lst.sipapi.service.HashtagService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class HashtagController {
    @Autowired
    private HashtagService hashtagService;

    @GetMapping("/hashtag/{id}")
    public Hashtag findById(@PathVariable Long id){
        return hashtagService.findById(id);
    }

    @GetMapping("/hashtags")
    public List<Hashtag> findAll(){
        return hashtagService.findAll();
    }

    @PostMapping("/hashtag")
    public Hashtag save(@RequestBody Hashtag hashtag){
        return hashtagService.save(hashtag);
    }

}
