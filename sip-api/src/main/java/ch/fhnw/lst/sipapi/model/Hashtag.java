package ch.fhnw.lst.sipapi.model;

import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static javax.persistence.GenerationType.SEQUENCE;

@Entity(name = "Hashtag")
@Table(name = "hashtag")
public class Hashtag {
    @Id
    @SequenceGenerator(
            name = "tag_sequence",
            sequenceName = "tag_sequence",
            allocationSize = 1)
    @GeneratedValue(
            strategy = SEQUENCE,
            generator = "tag_sequence")
    private Long id;

    @Column(
            name = "hashtagtxt",
            columnDefinition = "TEXT")
    private String hashtagtxt;

    @Column(
            name = "timestamp",
            nullable = false,
            updatable = false)
    @CreationTimestamp
    private Date timestamp;

    @ManyToMany(mappedBy = "imageHashtagsList")
    private List<Image> imageList = new ArrayList<>();

    public void addImage(Image image){
        imageList.add(image);
        countHashtags();
    }
    public void removeImage(Image image){
        imageList.remove(image);
        countHashtags();
    }

    @ManyToMany(mappedBy = "searchFavHashtagsList")
    private List<Search_Favorites> searchFavList = new ArrayList<>();

    @Column(
            name = "UseCount",
            columnDefinition = "INTEGER")
    private int hashtagCount;

    public void countHashtags(){
        this.hashtagCount = imageList.size();
    }

    public int getHashtagCount() {
        return hashtagCount;
    }

    public Hashtag() { }

    public Hashtag(String hashtagtxt) {
        this.hashtagtxt = hashtagtxt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getHashtagtxt() {
        return hashtagtxt;
    }

    public void setHashtagtxt(String hashtagtxt) {
        this.hashtagtxt = hashtagtxt;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void addSearch_Favorites(Search_Favorites searchFavorites){
        searchFavList.add(searchFavorites);
    }
}
