package ch.fhnw.lst.sipapi.service;

import ch.fhnw.lst.sipapi.exception.ResourceNotFoundException;
import ch.fhnw.lst.sipapi.model.Search_Favorites;
import ch.fhnw.lst.sipapi.repository.Search_FavoritesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class SearchFavService {
    @Autowired
    Search_FavoritesRepository search_favoritesRepository;

    public List<Search_Favorites> findAll(){
        return search_favoritesRepository.findAll();
    }
    public Search_Favorites findById(Long id){
        return search_favoritesRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("no such Search_Favorites with id "+id));
    }
    public Search_Favorites save(Search_Favorites album){
        return search_favoritesRepository.save(album);
    }
}
