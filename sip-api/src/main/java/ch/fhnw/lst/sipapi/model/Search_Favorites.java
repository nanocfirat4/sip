package ch.fhnw.lst.sipapi.model;

import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static javax.persistence.GenerationType.SEQUENCE;

@Entity(name = "SearchFav")
@Table( name = "search_fav")
public class Search_Favorites {

    @Id
    @SequenceGenerator(
            name = "searchFav_sequence",
            sequenceName = "searchFav_sequence",
            allocationSize = 1)
    @GeneratedValue(
            strategy = SEQUENCE,
            generator = "searchFav_sequence")
    @Column(
            name = "id",
            updatable = false)
    private Long id;

    @Column(
            name = "albumname",
            nullable = false,
            columnDefinition = "VARCHAR(255)")
    private String albumname;

    @Column(
            name = "description",
            columnDefinition = "TEXT")
    private String description;

    @Column(
            name = "text_tokens",
            nullable = false,
            columnDefinition = "TEXT")
    private String textTokens;

    @ManyToMany
    @JoinTable(
            name = "search_fav_hashtag_association",
            joinColumns = {@JoinColumn(name = "search_fav_id",referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name = "hashtag_id",referencedColumnName = "id")}
    )
    private List<Hashtag> searchFavHashtagsList = new ArrayList<>();

    public void addHashtag(Hashtag hashtag){
        searchFavHashtagsList.add(hashtag);
    }

    @Column(
            name = "timestamp",
            nullable = false,
            updatable = false)
    @CreationTimestamp
    private Date timestamp;

    public Search_Favorites() {
    }

    public Search_Favorites(String albumname, String description, String textTokens, List<Hashtag> searchFavHashtagsList) {
        this.albumname = albumname;
        this.description = description;
        this.textTokens = textTokens;
        this.searchFavHashtagsList = searchFavHashtagsList;
    }

    public Search_Favorites(String textTokens, List<Hashtag> searchFavHashtagsList) {
        this.textTokens = textTokens;
        this.searchFavHashtagsList = searchFavHashtagsList;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAlbumname() {
        return albumname;
    }

    public void setAlbumname(String albumname) {
        this.albumname = albumname;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTextTokens() {
        return textTokens;
    }

    public void setTextTokens(String textTokens) {
        this.textTokens = textTokens;
    }

    public List<Hashtag> getSearchFavHashtagsList() {
        return searchFavHashtagsList;
    }

    public void setSearchFavHashtagsList(List<Hashtag> searchFavHashtagsList) {
        this.searchFavHashtagsList = searchFavHashtagsList;
    }

    public Date getTimestamp() {
        return timestamp;
    }
}
