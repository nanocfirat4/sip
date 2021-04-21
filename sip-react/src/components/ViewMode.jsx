import React, { useContext, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import Comment from './Comment';
import { GetPacsImage } from '../services/PacsService'
import { Context } from '../Store';
import AddFields from './AddFields';
import keycloak from '../keycloak'
import PhotoSizeSelectLargeIcon from '@material-ui/icons/PhotoSizeSelectLarge';
// Services
import { ImageService } from '../services/ImageService'
import { CommentService } from '../services/CommentService'
import { TagService } from '../services/TagService'


const ViewMode = (buttonTheme) => {
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
        if (currentImage.imageCommentsList.length > 0)
            return (
                <div id="matchingComments"
                    style={{
                        borderRadius: "20px",
                        backgroundColor: "white",
                        padding: "10px",
                        margin: "20px 0"
                    }}
                >
                    <h5>Comments</h5>
                    {currentImage.imageCommentsList.map(comment =>
                        state.matchingComments.find(({ id }) => comment.id === id)
                            ? <Comment comment={comment} currentImage={currentImage} selectedImages={state.selectedImages} isCommon={true} updateSelected={updateSelected} />
                            : <Comment selectedImages={state.selectedImages} currentImage={currentImage} comment={comment} updateSelected={updateSelected} />
                    )}
                </div>
            )
        return null
    }

    function getTagList() {
        return (
            <div id="matchingComments"
                style={{
                    borderRadius: "20px",
                    backgroundColor: "white",
                    padding: "10px",
                    margin: "20px 0"
                }}
            >
                <h5>Tags</h5>
                {currentImage.imageHashtagsList.map(tag =>
                    state.matchingTags.find(({ id }) => tag.id === id)
                        ? <Tag viewMode={true} updateSelected={updateSelected} common={true} selectedImages={state.selectedImages} tag={tag} currentImage={currentImage} />
                        : <Tag viewMode={true} updateSelected={updateSelected} selectedImages={state.selectedImages} tag={tag} currentImage={currentImage} />
            )}
            </div>
        )
    }


    return (
        state.loading ? <div>Loading...</div> :
            <div id="imageView">
                <Row>
                    <Col lg={8}>
                        <div className="slide-container">
                            <Slide
                                autoplay={false}
                                onChange={handleChange}
                            >
                                {state.selectedImages.map(image =>
                                    <div className="each-slide" style={{
                                        position: "relative",
                                    }}>
                                        
                                            <img src={URL.createObjectURL(state.imageBlobs[image.pacs_id])}
                                                style={{
                                                    display: 'block',
                                                    margin: 'auto',
                                                    maxWidth: '100%'
                                                }}
                                            />
                                            <a href={URL.createObjectURL(state.imageBlobs[image.pacs_id])} target="_blank"
                                                style={{
                                                    position: "absolute", top:"0", right:"0", 
                                                }}
                                            >
                                                <PhotoSizeSelectLargeIcon 
                                                    fontSize="large"
                                                />
                                            </a>
                                    </div>
                                )}
                            </Slide>
                        </div>
                    </Col>
                    <Col lg={4}>
                        <div
                            style={{
                                borderRadius: "20px",
                                backgroundColor: "white",
                                padding: "10px",
                                margin: "20px 0"
                            }}>

                            <h3>{currentImage.description}</h3>
                        </div>

                        <AddFields currentImage={currentImage} buttonTheme={buttonTheme}/>

                        {getTagList()}
                        {getCommentList()}

                    </Col>
                </Row>
            </div>
    )
}
export default ViewMode