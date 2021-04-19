import React, { useContext, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import Comment from './Comment';
import { GetPacsImage } from '../services/PacsService'
import { Context } from '../Store';


const ViewMode = () => {
    const [state, dispatch] = useContext(Context);
    const [currentImage, setCurrentImage] = useState(state.selectedImages[0]);
    
    useEffect(() => {
        dispatch({type: "SET_IMAGE_BLOBS", payload: {}})

        // Load all images, Tags and Comments on mount
        var blobs = {}
        state.selectedImages.map(image => {
            GetPacsImage(image.pacs_id)
                .then(response => {
                    blobs[image.pacs_id] = response;

                    if(state.selectedImages.length == Object.keys(blobs).length) {
                        dispatch({type: "SET_IMAGE_BLOBS", payload: blobs})
                        dispatch({type: "SET_LOADING", payload: false})
                    }
                })
        });
    }, []);


    // Select image when Sliding
    function handleChange(previous, next) {
        setCurrentImage(state.selectedImages[next]);
    }
    

    return (
        state.loading ? <div>Loading...</div> :
            <div id="imageView">
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
                <Row>
                    <Col md={12} lg={3} id="bordered">
                        Kommentare und Tags
                        </Col>
                    <Col md={12} lg={9} id="bordered">
                    </Col>
                </Row>
                <Row>
                    <Col md={12} lg={3} id="bordered">
                        Kommentare und Tags in Common<br />
                        <div id="matchingComments">
                            {state.matchingComments.map(comment =>
                                <Comment comment={comment} />
                            )}
                        </div>
                    </Col>
                    <Col md={12} lg={9} id="bordered">
                        Description:<br />
                        {currentImage.description}<br /><br />
                        Kommentare zum aktuellen Bild<br />
                        {currentImage.imageCommentsList.map(comment => <Comment comment = {comment} />)} 
                    </Col>
                </Row>
            </div>
    )
}
export default ViewMode