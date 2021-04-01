package ch.fhnw.lst.sipapi.controller;

import ch.fhnw.lst.sipapi.model.Image;
import ch.fhnw.lst.sipapi.repository.CommentRepository;
import ch.fhnw.lst.sipapi.repository.HashtagRepository;
import ch.fhnw.lst.sipapi.repository.ImageRepository;
import ch.fhnw.lst.sipapi.service.ImageService;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
class ImageControllerIntTest {
    @MockBean
    private HashtagRepository hashtagRepository;
    @MockBean
    private CommentRepository commentRepository;
    @MockBean
    private ImageRepository imageRepository;
    @MockBean
    private ImageService imageService;

    @Autowired
    private MockMvc mvc;
    @Autowired
    private ImageController imageController;

    @Test
    void findByIdTest() throws Exception {
        //given(imageService.findById(1L)).willReturn(douglas);
        //given(imageRepository.findById(1L)).willReturn(Optional.of(douglas));
        createTestImage(
                "hitchhiker's guide",
                "~/Betelgeuse/Five",
                "42/fourty/two");

        mvc.perform(get("/images"))
                .andExpect(status().is4xxClientError())
                //.andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_JSON))
                //.andExpect((ResultMatcher) jsonPath("$[0].description", is("hitchhiker's guide")))
                ;
    }
    private void createTestImage(String description,String thumbnail, String pacs_id){
        Image douglas = new Image(description,thumbnail,pacs_id);
        imageRepository.save(douglas);
    }
}
