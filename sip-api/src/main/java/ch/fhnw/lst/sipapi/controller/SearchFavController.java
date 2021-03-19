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
public class SearchFavController {
    @Autowired
    private SearchFavService searchFavService;

    @GetMapping("/album/{id}")
    public Search_Favorites findById(@PathVariable Long id){
        return searchFavService.findById(id);
    }

    @GetMapping("/albums")
    public List<Search_Favorites> findAll(){
        return searchFavService.findAll();
    }

    @PostMapping("/album")
    public Search_Favorites save(@RequestBody Search_Favorites album){
        return searchFavService.save(album);
    }

}
