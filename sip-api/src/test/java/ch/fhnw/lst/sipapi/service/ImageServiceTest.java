/*
package ch.fhnw.lst.sipapi.service;

import ch.fhnw.lst.sipapi.model.Comment;
import ch.fhnw.lst.sipapi.model.Image;
import ch.fhnw.lst.sipapi.repository.CommentRepository;
import ch.fhnw.lst.sipapi.repository.ImageRepository;
import org.junit.Before;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@RunWith(SpringRunner.class)
class ImageServiceTest {

    @TestConfiguration
    static class ImageServiceImplTestContextConfiguration {

        @Bean
        public ImageService imageService() {
            return new ImageServiceImpl();
        }
    }

    @MockBean
    private ImageRepository repository;

    @Autowired
    private ImageService imageService;

    @MockBean
    private CommentRepository commentRepository;

    @Before
    public void setUp() {
        Image douglas = new Image(
                "hitchhiker's guide",
                "~/Betelgeuse/Five",
                "42/fourty/two"
        );
        repository.save(douglas);
        douglas = repository.findById(1L).get();
        Mockito.when(repository.findById(douglas.getId())).thenReturn(douglas);
    }

    @Test
    public void whenValidId_thenImageShouldBeFound() {
        Long id = 1L;
        Long foundId= imageService.findById(id).getId();
        assertThat(foundId).isEqualTo(id);

    }

    @Test
    void saveCommentToImageTest() {
        Image douglas = new Image(
                "hitchhiker's guide",
                "~/Betelgeuse/Five",
                "42/fourty/two"
        );
        repository.save(douglas);
        Comment comment42 = new Comment("42_solution");
        commentRepository.save(comment42);
        imageService.saveCommentToImage(commentRepository.findById(1L).get().getId(), repository.findById(1L).get().getId());
        assertEquals("42_solution", repository.findById(1L).get().getImageCommentsList().get(1).getCommenttxt());


    }
}*/
