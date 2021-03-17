package ch.fhnw.lst.sipapi.model;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static javax.persistence.GenerationType.SEQUENCE;

@Entity(name = "Hashtag")
@Table(name = "hashtag")
public class hashtag {
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
            nullable = false)
    private Date timestamp;

    @ManyToMany(mappedBy = "imageHashtagsList")
    private List<Image> imageList = new ArrayList<>();

    public void addImage(Image image){
        imageList.add(image);
    }

    public hashtag() {
    }

    public hashtag(String hashtagtxt, Date timestamp) {
        this.hashtagtxt = hashtagtxt;
        this.timestamp = timestamp;
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

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }
}
