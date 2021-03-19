package ch.fhnw.lst.sipapi.controller;

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

}
