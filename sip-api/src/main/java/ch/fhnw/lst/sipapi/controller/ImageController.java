package ch.fhnw.lst.sipapi.controller;

import ch.fhnw.lst.sipapi.model.Comment;
import ch.fhnw.lst.sipapi.model.Hashtag;
import ch.fhnw.lst.sipapi.model.Image;
import ch.fhnw.lst.sipapi.service.ImageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class ImageController {
    final Logger logger = LoggerFactory.getLogger(ImageController.class);

    @Autowired
    private ImageService imageService;

    @GetMapping("/image/{id}")
    public Image findById(@PathVariable Long id){
        logger.info("Url /image/{id} is called");
        return imageService.findById(id);
    }

    @GetMapping("/images")
    public List<Image> findAll(){
        logger.info("Url /images is called");
        return imageService.findAll();
    }

    @PostMapping("/image")
    public Image save(@RequestBody Image image){
        logger.info("Url /image  with request body image as JSON is called");
        return imageService.save(image);
    }

    @PostMapping("/image/{id}/savecomment/{commentId}")
    public void saveComment(@PathVariable Long id,@PathVariable Long commentId){
        logger.info("Url /image/{id}/savecomment/{commentid} is called");
        imageService.saveCommentToImage(commentId,id);
    }

    @PostMapping("/image/{id}/savetag/{hashtagId}")
    public void saveHashtag(@PathVariable Long id,@PathVariable Long hashtagId){
        logger.info("Url /image/{id}/savetag/{hashtagtid} is called");
        imageService.saveHashtagToImage(hashtagId,id);
    }

    @PostMapping("/image/{id}/del_comment/{commentId}")
    public void delComment(@PathVariable Long id,@PathVariable Long commentId){
        logger.info("Url /image/{id}/del_comment/{commentid} is called");
        imageService.removeCommentToImage(commentId,id);
    }

    @PostMapping("/image/{id}/del_tag/{hashtagId}")
    public void delHashtag(@PathVariable Long id,@PathVariable Long hashtagId){
        logger.info("Url /image/{id}/del_tag/{hashtagtid} is called");
        imageService.removeHashtagToImage(hashtagId,id);
    }

}
