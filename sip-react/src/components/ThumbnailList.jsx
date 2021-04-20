import React, { useContext, useEffect } from 'react'
import Thumbnail from './Thumbnail'
import Comment from './Comment';
import { Col, Row } from 'react-bootstrap';
import keycloak from '../keycloak'
// Services
import { ImageService } from '../services/ImageService'
import { CommentService } from '../services/CommentService'
import { TagService } from '../services/TagService'
// Global states
import { Context } from '../Store';
import AddFields from './AddFields';
import Tag from './Tag';


const ThumbnailList = () => {
    const [state, dispatch] = useContext(Context);

    useEffect(() => {
        // Load all images, Tags and Comments on mount
        dispatch({ type: "SET_LOADING", payload: true });
        loadImages();
        loadComments();
        laodTags();
        dispatch({ type: "SET_LOADING", payload: false });

    }, []);


    // Load all images
    function loadImages() {
        ImageService.authToken(keycloak.token)
        ImageService.findByFilter(state.searchComments, state.searchTags).then((res) => {
            dispatch({ type: "SET_ALL_IMAGES", payload: res.data })
        });
    }

    // Load all comments
    function loadComments() {
        CommentService.authToken(keycloak.token)
        CommentService.findAll().then((res) => {
            dispatch({ type: "SET_ALL_COMMENTS", payload: res.data })
        });
    }

    // Load all tags
    function laodTags() {
        TagService.authToken(keycloak.token)
        TagService.findAll().then((res) => {
            dispatch({ type: "SET_ALL_TAGS", payload: res.data })
        });
    }


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





    return (
        state.loading ? <p>Loading...</p> : (
            <div className="mt-3">


                <Row>
                    <Col md={12} lg={3}>
                        <div style={{
                            position: "-webkit-sticky",
                            position: "sticky",
                            top: 0,
                        }}>
                            <AddFields />

                            <div>
                                <div >
                                    {/* Tags -> Show tags of selected images and add new ones */}
                                    {state.matchingTags.length > 0 ?
                                        <div id="matchingTags"
                                            style={{
                                                borderRadius: "20px",
                                                backgroundColor: "white",
                                                padding: "10px",
                                                margin: "20px 0"
                                            }}
                                        >
                                            <h5>Tags in common</h5>
                                            {state.matchingTags.map(tag =>
                                                <Tag
                                                    tag={tag}
                                                    selectedImages={state.selectedImages}
                                                    updateSelected={updateSelected}
                                                />
                                            )}
                                        </div>
                                        : null
                                    }
                                </div>
                                <div>
                                    {/* Comments -> Show comments of selected images and add new ones */}
                                    {state.matchingComments.length > 0 ?
                                        <div id="matchingComments"
                                            style={{
                                                borderRadius: "20px",
                                                backgroundColor: "white",
                                                padding: "10px",
                                                margin: "20px 0"
                                            }}
                                        >
                                            <h5>Comments in common</h5>
                                            {state.matchingComments.map(comment =>
                                                <Comment forThumbnails={true} selectedImages={state.selectedImages} comment={comment} updateSelected={updateSelected} />
                                            )}
                                        </div>
                                        : null
                                    }
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col md={12} lg={9}>
                        {/* Display Thumbnails */}
                        {state.allImages.map(image =>
                            <Thumbnail
                                selectedImages={state.selectedImages}
                                image={image}
                            />
                        )}
                    </Col>
                </Row>
            </div>
        )
    )
}
export default ThumbnailList