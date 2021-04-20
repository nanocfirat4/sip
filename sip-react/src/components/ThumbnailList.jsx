import React, { useContext, useEffect } from 'react'
import Thumbnail from './Thumbnail'
import Comment from './Comment';
import { Col, Row } from 'react-bootstrap';
import keycloak from '../keycloak'
// Services
import { ImageService } from '../services/ImageService'
import { CommentService } from '../services/CommentService'
import { TagService } from '../services/TagService'
// Material-UI
import Chip from '@material-ui/core/Chip';
// Global states
import { Context } from '../Store';
import AddFields from './AddFields';


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

    // Add new Comment to all selected images
    function handleAddComment() {
        if (state.newCommentTxt !== "") {
            var i = 1;

            CommentService.authToken(keycloak.token)
            CommentService.add(state.newCommentTxt)
                .then(res => {
                    state.selectedImages.map((image) => {
                        CommentService.assignComment(image.id, res.data.id)
                            .then(() => {
                                i === state.selectedImages.length ? updateSelected() : i++;
                            })
                    })
                })
            dispatch({ type: "SET_NEW_COMMENT_TEXT", payload: "" })
        }
    }

    // Add new Tag to all selected images
    function handleAddTag() {
        if (state.newTagTxt !== "") {
            var double = false;
            var i = 1;

            TagService.authToken(keycloak.token)

            state.allTags.map(tag => {
                if (tag.hashtagtxt === state.newTagTxt) {
                    state.selectedImages.map((image) => {
                        TagService.assignTag(image.id, tag.id)
                            .then(() => {
                                i === state.selectedImages.length ? updateSelected() : i++;
                            })
                    })
                    double = true;
                }
            });

            if (!double) {
                TagService.add(state.newTagTxt)
                    .then((res) => {
                        state.selectedImages.map((image) => {
                            TagService.assignTag(image.id, res.data.id)
                                .then(() => {
                                    i === state.selectedImages.length ? updateSelected() : i++;
                                })
                        })
                    })
                dispatch({ type: "SET_NEW_TAG_TEXT", payload: "" })
            }
        }
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



    const handleDeleteTag = (tag) => {
        var i = 1;

        TagService.authToken(keycloak.token);
        state.selectedImages.map(image => {
            TagService.remove(image.id, tag).then(() => {
                i === state.selectedImages.length ? updateSelected() : i++;
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
                                <div style={{ margin: "20px 0" }}>
                                    {/* Tags -> Show tags of selected images and add new ones */}
                                    {state.matchingTags ?
                                        state.matchingTags.map(tag =>
                                            <Chip
                                                label={tag.hashtagtxt}
                                                size="medium"
                                                onDelete={() => handleDeleteTag(tag)}
                                                style={{
                                                    margin: "5px",
                                                    fontSize: "11pt"
                                                }}
                                            />
                                        )
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
                                                padding: "10px"
                                            }}
                                        >
                                            {state.matchingComments.map(comment =>
                                                <Comment selectedImages={state.selectedImages} comment={comment} updateSelected={updateSelected} />
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