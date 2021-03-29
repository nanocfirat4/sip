package ch.fhnw.lst.sipapi.service;

import ch.fhnw.lst.sipapi.DatabaseLoader;
import ch.fhnw.lst.sipapi.exception.ResourceNotFoundException;
import ch.fhnw.lst.sipapi.model.Comment;
import ch.fhnw.lst.sipapi.model.Hashtag;
import ch.fhnw.lst.sipapi.model.Image;
import ch.fhnw.lst.sipapi.model.Search_Favorites;
import ch.fhnw.lst.sipapi.repository.CommentRepository;
import ch.fhnw.lst.sipapi.repository.HashtagRepository;
import ch.fhnw.lst.sipapi.repository.ImageRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ImageService {
    final Logger logger = LoggerFactory.getLogger(ImageService.class);
    @Autowired
    ImageRepository imageRepository;

    @Autowired
    HashtagRepository hashtagRepository;

    @Autowired
    CommentRepository commentRepository;

    public List<Image> findAll(){
        return imageRepository.findAll();
    }
    public Image findById(Long id){
        logger.info("Enter FindById  from ImageService");
        return imageRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("no such Image with id "+id));
    }
    public Image save(Image image){
        return imageRepository.save(image);
    }

    public void saveCommentToImage(Long commentId, Long id) {
        logger.info("Enter saveCommentToImage from ImageService");
        imageRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("no such Image with id "+id));
        commentRepository.findById(commentId).orElseThrow(() ->
                new ResourceNotFoundException("no such Comment with id "+id));
        imageRepository.findById(id).get().addComment(commentRepository.findById(commentId).get());
    }

    public void removeCommentToImage(Long commentId, Long id) {
        logger.info("Enter removeCommentToImage from ImageService");
        imageRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("no such Image with id "+id));
        commentRepository.findById(commentId).orElseThrow(() ->
                new ResourceNotFoundException("no such Comment with id "+id));
        imageRepository.findById(id).get().removeComment(commentRepository.findById(commentId).get());
    }

    public void saveHashtagToImage(Long hashtagId, Long id) {
        logger.info("Enter saveHashtagToImage from ImageService");
        imageRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("no such Image with id "+id));
        hashtagRepository.findById(hashtagId).orElseThrow(() ->
                new ResourceNotFoundException("no such HashtagId with id "+id));
        imageRepository.findById(id).get().addHashtag(hashtagRepository.findById(hashtagId).get());
    }

    public void removeHashtagToImage(Long hashtagId, Long id) {
        logger.info("Enter removeHashtagToImage from ImageService");
        imageRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("no such Image with id "+id));
        hashtagRepository.findById(hashtagId).orElseThrow(() ->
                new ResourceNotFoundException("no such HashtagId with id "+id));
        imageRepository.findById(id).get().removeHashtag(hashtagRepository.findById(hashtagId).get());
    }

    public List<Image> findBySearch(Search_Favorites search) {
        logger.info("Image search is used");
        List<Image> resultList = new ArrayList<>();
        String freeText = search.getTextTokens();
        List<Hashtag> hashtags = search.getSearchFavHashtagsList();
        List<Image> images = imageRepository.findAll();
        //If there is a free text search
        freeText = freeText.trim();
        if(!freeText.isEmpty()){
            for(Image image:images){
                //Add Pictures witch contain all of the textTokens in description
                if(checkSubstringsINString(image.getDescription(),freeText)){resultList.add(image);}
                //Add Pictures witch contain all of the textTokens in comments
                if(checkSubstringsINComments(image.getImageCommentsList(),freeText)){resultList.add(image);}
            }
        }else{ // Else put all images in resultlist
            resultList = images;
        }
        // remove images from result list which doesn't match the Hashtags
        // Check if hashtags are searched
        if(!hashtags.isEmpty()){
            //if hashtag not found remove
            resultList.removeIf(image -> !checkHashtagsInImageTags(image.getImageHashtagsList(), hashtags));
        }
        return resultList;
    }

    private boolean checkHashtagsInImageTags(List<Hashtag> imageHashtagsList, List<Hashtag> hashtags) {
        boolean result = true;
        for(Hashtag searchedhashtag: hashtags){
            boolean subtest = false;
            for(Hashtag hashtag:imageHashtagsList){
                if(hashtag.equals(searchedhashtag)) {
                    subtest=true;
                }
            }
            //IF one hashtag wasn't found in all imageHashtags -return false
            if(!subtest) {
                return false;
            }
        }
        //IF all hashtags were found in  imageHashtags -return true
        return result;
    }

    private boolean checkSubstringsINComments(List<Comment> imageCommentsList, String freeText) {
        boolean result = true;
        freeText = freeText.toLowerCase();
        String[] freetextTokens = freeText.split(",");
        for(String textToken:freetextTokens){
            textToken = textToken.trim();
            boolean subresult = false;
            for(Comment comment:imageCommentsList){
                if(comment.getCommenttxt().contains(textToken)) {
                    subresult=true;
                }
            }
            //IF one token wasn't found in all comments -return false
            if(!subresult) {
                return false;
            }
        }
        //IF all tokens were found in  comments -return true
        return result;
    }

    private boolean checkSubstringsINString(String description, String freeText) {
        boolean result = true;
        description = description.toLowerCase();
        freeText = freeText.toLowerCase();
        String[] freetextTokens = freeText.split(",");
        for(String textToken:freetextTokens){
            textToken = textToken.trim();
            if(!description.contains(textToken))return false;
        }
        return result;
    }
}

