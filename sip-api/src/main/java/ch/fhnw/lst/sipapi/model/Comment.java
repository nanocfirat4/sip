package ch.fhnw.lst.sipapi.model;

import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static javax.persistence.GenerationType.SEQUENCE;

@Entity(name = "Comment")
@Table(name = "comment")
public class Comment {
    @Id
    @SequenceGenerator(
            name = "comment_sequence",
            sequenceName = "comment_sequence",
            allocationSize = 1)
    @GeneratedValue(
            strategy = SEQUENCE,
            generator = "comment_sequence")
    private Long id;

    @Column(
            name = "commenttxt",
            columnDefinition = "TEXT")
    private String commenttxt;

    @Column(
            name = "timestamp",
            nullable = false,
            updatable = false)
    @CreationTimestamp
    private Date timestamp;

    @ManyToMany(mappedBy = "imageCommentsList")
    private List<Image> imageList = new ArrayList<>();

    public void addImage(Image image){
        imageList.add(image);
    }

    public Comment(String commenttxt) {
        this.commenttxt = commenttxt;
    }

    public Comment() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCommenttxt() {
        return commenttxt;
    }

    public void setCommenttxt(String commenttxt) {
        this.commenttxt = commenttxt;
    }

    public Date getTimestamp() {
        return timestamp;
    }
}
