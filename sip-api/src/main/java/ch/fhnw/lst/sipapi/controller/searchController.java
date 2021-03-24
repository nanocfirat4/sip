package ch.fhnw.lst.sipapi.controller;

import ch.fhnw.lst.sipapi.model.Image;
import ch.fhnw.lst.sipapi.model.Search_Favorites;
import ch.fhnw.lst.sipapi.service.ImageService;
import ch.fhnw.lst.sipapi.service.SearchFavService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class searchController {

    @Autowired
    private ImageService imageService;


    @GetMapping("/search/all")
    public List<Image> findAll(){
        return imageService.findAll();
    }

    @GetMapping("/search/filter/")
    public List<Image> findCorresponding(@RequestBody Search_Favorites search){
        return imageService.findBySearch(search);
    }


}
