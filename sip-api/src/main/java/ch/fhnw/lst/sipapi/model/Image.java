package ch.fhnw.lst.sipapi.model;

import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static javax.persistence.GenerationType.SEQUENCE;

@Entity(name = "Image")
@Table( name = "image")
public class Image {

    @Id
    @SequenceGenerator(
            name = "image_sequence",
            sequenceName = "image_sequence",
            allocationSize = 1)
    @GeneratedValue(
            strategy = SEQUENCE,
            generator = "image_sequence")
    @Column(
            name = "id",
            updatable = false)
    private Long id;

    @Column(
            name = "description",
            columnDefinition = "TEXT")
    private String description;

    @Column(
            name = "thumbnail",
            nullable = false,
            columnDefinition = "VARCHAR(255)")
    private String thumbnail;

    @Column(
            name = "pacs_id",
            columnDefinition = "TEXT",
            nullable = false)
    private String pacs_id;

    @Column(
            name = "timestamp",
            nullable = false,
            updatable = false)
    @CreationTimestamp
    private Date timestamp;

    @ManyToMany
    @JoinTable(
            name = "image_comment_association",
            joinColumns = {@JoinColumn(name = "image_id",referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name = "comment_id",referencedColumnName = "id")}
    )
    private List<Comment> imageCommentsList = new ArrayList<>();

    public void addComment(Comment comment){
        imageCommentsList.add(comment);
    }

    @ManyToMany
    @JoinTable(
            name = "image_hashtag_association",
            joinColumns = {@JoinColumn(name = "image_id",referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name = "hashtag_id",referencedColumnName = "id")}
    )
    private List<Hashtag> imageHashtagsList = new ArrayList<>();

    public void addHashtag(Hashtag hashtag){
        imageHashtagsList.add(hashtag);
    }

    public Image(String description, String thumbnail, String pacs_id) {
        this.description = description;
        this.thumbnail = thumbnail;
        this.pacs_id = pacs_id;

    }

    public Image() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }

    public String getPacs_id() {
        return pacs_id;
    }

    public void setPacs_id(String pacs_id) {
        this.pacs_id = pacs_id;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    @Override
    public String toString() {
        return "image{" +
                "id=" + id +
                ", description='" + description + '\'' +
                ", thumbnail='" + thumbnail + '\'' +
                ", pacs_id=" + pacs_id +
                ", timestamp=" + timestamp +
                '}';
    }
}
