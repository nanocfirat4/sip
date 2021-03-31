package ch.fhnw.lst.sipapi.model;

import org.junit.Before;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
class ImageTest {

    Image douglas = new Image(
            "hitchhiker's guide",
            "~/Betelgeuse/Five",
            "42/fourty/two"
            );


    @Test
    void addComment() {
        Comment comment42 = new Comment("42_solution");
        douglas.addComment(comment42);
        List<Comment> empty = new ArrayList<>();
        assertNotEquals( empty, douglas.getImageCommentsList());
        assertEquals("42_solution", douglas.getImageCommentsList().get(0).getCommenttxt());
    }

    @Test
    void removeComment() {
        Comment comment42 = new Comment("42_solution");
        douglas.addComment(comment42);
        List<Comment> empty = new ArrayList<>();
        assertNotEquals( empty, douglas.getImageCommentsList());
        douglas.removeComment(comment42);
        assertEquals( empty, douglas.getImageCommentsList());

    }

    @Test
    void getDescription() {
        assertEquals("hitchhiker's guide", douglas.getDescription());
    }
}