import React, { useContext, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import Comment from './Comment';
import { GetPacsImage } from '../services/PacsService'
import { Context } from '../Store';
import AddFields from './AddFields';


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

    useEffect(() => {
        setCurrentImage(state.selectedImages[currentIndex])
    }, [state.selectedImages]);


    // Select image when Sliding
    function handleChange(previous, next) {
        setCurrentImage(state.selectedImages[next]);
        setCurrentIndex(next)
    }


    function getCommentList() {
        console.log(currentImage.imageCommentsList)
        console.log(state.matchingComments)
        var arr1 = currentImage.imageCommentsList
        var arr2 = state.matchingComments

        const result = arr1.reduce((acc, cur) => [...acc, arr2.find(({ id }) => cur.id === id) || cur], []);

        return (
            <div>
                <h5>Kommentare und Tags in Common</h5>
                {currentImage.imageCommentsList.map(comment =>
                    state.matchingComments.find(({ id }) => comment.id === id) ? <Comment comment={comment} selectedImages={state.selectedImages} isCommon={true} /> : <Comment selectedImages={state.selectedImages} comment={comment} />
                )}
            </div>
        )
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