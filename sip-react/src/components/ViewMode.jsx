import React, { useContext, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import Comment from './Comment';
import { GetPacsImage } from '../services/PacsService'
import { Context } from '../Store';
import AddFields from './AddFields';
import keycloak from '../keycloak'
// Services
import { ImageService } from '../services/ImageService'
import { CommentService } from '../services/CommentService'
import { TagService } from '../services/TagService'


const ViewMode = () => {
    const [state, dispatch] = useContext(Context);
    const [currentIndex, setCurrentIndex] = useState(0)
    const [currentImage, setCurrentImage] = useState(state.selectedImages[0]);

    useEffect(() => {
        dispatch({ type: "SET_IMAGE_BLOBS", payload: {} })

        // Load all images, Tags and Comments on mount
        var blobs = {}
        state.selectedImages.map(image => {
            GetPacsImage(image.pacs_id)
                .then(response => {
                    blobs[image.pacs_id] = response;

                    if (state.selectedImages.length == Object.keys(blobs).length) {
                        dispatch({ type: "SET_IMAGE_BLOBS", payload: blobs })
                        dispatch({ type: "SET_LOADING", payload: false })
                    }
                })
        });
    }, []);

    // Update all Comments and Tags and update selected images
    function updateSelected() {

        // Update all Comments
        CommentService.authToken(keycloak.token)
        CommentService.findAll()
            .then(res => {
                dispatch({ type: "SET_ALL_COMMENTS", payload: res.data })


                // Update all Tags
                TagService.authToken(keycloak.token)
                TagService.findAll().then(res => {
                    dispatch({ type: "SET_ALL_TAGS", payload: res.data })


                    // Update the selected images
                    ImageService.authToken(keycloak.token)
                    var selectedImages = []
                    var i = 1
                    state.selectedImages.map(image => {
                        ImageService.findById(image.id)
                            .then(res => {
                                selectedImages.push(res.data)
                                if (i === state.selectedImages.length) {
                                    dispatch({ type: "SET_SELECTED_IMAGES", payload: selectedImages })

                                    // Update only selected images in allImages state
                                    var allImages = state.allImages.reduce((acc, cur) => [...acc, selectedImages.find(({ id }) => cur.id === id) || cur], [])
                                    dispatch({ type: "SET_ALL_IMAGES", payload: allImages })
                                }
                                else i++
                            })
                    })
                })
            })
    }


    useEffect(() => {
        setCurrentImage(state.selectedImages[currentIndex])
    }, [state.selectedImages]);


    // Select image when Sliding
    function handleChange(previous, next) {
        setCurrentImage(state.selectedImages[next]);
        setCurrentIndex(next)
    }


    function getCommentList() {
        return (
            <div>
                <h5>Kommentare und Tags</h5>
                {currentImage.imageCommentsList.map(comment =>
                    state.matchingComments.find(({ id }) => comment.id === id)
                        ? <Comment comment={comment} currentImage={currentImage} selectedImages={state.selectedImages} isCommon={true} updateSelected={updateSelected} />
                        : <Comment selectedImages={state.selectedImages} currentImage={currentImage} comment={comment} updateSelected={updateSelected} />
                )}
            </div>
        )
    }

    function getTagList() {

    }


    return (
        state.loading ? <div>Loading...</div> :
            <div id="imageView">
                <Row>
                    <Col md={8}>
                        <div className="slide-container">
                            <Slide
                                autoplay={false}
                                onChange={handleChange}
                            >
                                {state.selectedImages.map(image =>
                                    <div className="each-slide">
                                        <img src={URL.createObjectURL(state.imageBlobs[image.pacs_id])}
                                            style={{
                                                display: 'block',
                                                margin: 'auto',
                                                maxWidth: '100%'
                                            }}
                                        />
                                    </div>
                                )}
                            </Slide>
                        </div>
                    </Col>
                    <Col md={4}>
                        <h3>{currentImage.description}</h3>


                        <AddFields currentImage={currentImage} />

                        {getCommentList()}

                    </Col>
                </Row>
            </div>
    )
}
export default ViewMode