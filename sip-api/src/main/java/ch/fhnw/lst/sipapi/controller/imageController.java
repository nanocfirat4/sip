package ch.fhnw.lst.sipapi.controller;

import ch.fhnw.lst.sipapi.model.Comment;
import ch.fhnw.lst.sipapi.model.Hashtag;
import ch.fhnw.lst.sipapi.model.Image;
import ch.fhnw.lst.sipapi.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class imageController {
    @Autowired
    private ImageService imageService;

    @GetMapping("/image/{id}")
    public Image findById(@PathVariable Long id){
        return imageService.findById(id);
    }

    @GetMapping("/images")
    public List<Image> findAll(){
        return imageService.findAll();
    }

    @PostMapping("/image")
    public Image save(@RequestBody Image image){
        return imageService.save(image);
    }

    @PostMapping("/image/{id}/savecomment/{commentId}")
    public void saveComment(@RequestBody Long id,@RequestBody Long commentId){
        imageService.saveCommentToImage(commentId,id);
    }

    @PostMapping("/image/{id}/savetag/{hashtagId}")
    public void saveHashtag(@RequestBody Long id,@RequestBody Long hashtagId){
        imageService.saveHashtagToImage(hashtagId,id);
    }

}
