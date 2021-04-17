import React, { useContext, useEffect } from 'react'
import Thumbnail from './Thumbnail'
import SearchFields from './SearchFields'
import Comment from './Comment';
import { Col, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import keycloak from '../keycloak'
// Services
import { ImageService } from '../services/ImageService'
import { CommentService } from '../services/CommentService'
import { TagService } from '../services/TagService'
// Material-UI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
// Global states
import { Context } from '../Store';


const ThumbnailList = () => {
    const [state, dispatch] = useContext(Context);

    useEffect(() => {
        // Load all images, Tags and Comments on mount
        dispatch({type: "SET_LOADING", payload: true});
        loadImages();
        loadComments();
        laodTags();
        dispatch({type: "SET_LOADING", payload: false});
        
    }, []);

    
    // Load all images
    function loadImages() {
        ImageService.authToken(keycloak.token)
        ImageService.findAll().then((res) => {
            dispatch({type: "SET_ALL_IMAGES", payload: res.data})
        });
    }

    // Load all comments
    function loadComments() {
        CommentService.authToken(keycloak.token)
        CommentService.findAll().then((res) => {
            dispatch({type: "SET_ALL_COMMENTS", payload: res.data})
        });
    }

    // Load all tags
    function laodTags() {
        TagService.authToken(keycloak.token)
        TagService.findAll().then((res) => {
            dispatch({type: "SET_ALL_TAGS", payload: res.data})
        });
    }

    // Add new Comment to all selected images
    function handleAddComment() {
        CommentService.authToken(keycloak.token)
        CommentService.add(state.newCommentTxt).then((res) => {
            state.selectedImages.map((image) => {
                CommentService.assignComment(image.id, res.data.id)
            })
        })
    }

    // Add new Tag to all selected images
    function handleAddTag() {
        TagService.authToken(keycloak.token)
        TagService.add(state.newTagTxt).then((res) => {
            state.selectedImages.map((image) => {
                TagService.assignTag(image.id, res.data.id)
            })
        })
    }


    const handleDeleteChip = (chip) => {
        console.log(chip);
        this.props.selectedImages.map(image => {
            image.imageHashtagsList.map(tag => {
                if (tag.hashtagtxt === chip) {
                    TagService.authToken(keycloak.token);
                    TagService.remove(image.id, tag);
                    this.props.updateImages();
                    this.props.updateMatchingTags();
                    console.log(this.props.matchingTags)
                    //this.forceUpdate();
                    // this.updateSearchTags();
                    // this.props.searchImages();
                    // this.props.updateMatchingTags();
                }

            })
        })
    }




    return (
        state.loading ? <p>Loading...</p> : (
            <div className="mt-3">
                <SearchFields
                    tags={state.allTags}
                />



                <Row>
                    <Col md={12} lg={3}>
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
                                    <Comment selectedImages={state.selectedImages} comment={comment} />
                                )}
                            </div>
                        : null
                        }

                        {/* Tags -> Show tags of selected images and add new ones */}
                        {state.matchingTags ?
                            state.matchingTags.map(tag =>
                                <Chip
                                    label={tag}
                                    // onDelete={() => handleDeleteChip(tag)}
                                />
                            )
                        : null
                        }

                        <TextField
                            id="add_comment"
                            label="New Comment"
                            onChange={(event) => dispatch({type: "SET_NEW_COMMENT_TEXT", payload: event.target.value})}
                            style={{ width: "100%" }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            style={{ margin: "5px" }}
                            onClick={() => handleAddComment()}
                        >
                            Save Comment
                        </Button>

                        <TextField
                            id="add_tag"
                            label="New Tag"
                            onChange={(event) => dispatch({type: "SET_NEW_TAG_TEXT", payload: event.target.value})}
                            style={{ width: "100%" }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            style={{ margin: "5px" }}
                            onClick={() => handleAddTag()}
                        >
                            Save Tag
                        </Button>
                        {/* Tags -> Show tags of selected images and add new ones */}
                        <div id="matchingTags">
                            {/* {matchingTags.map(tag =>
                                <Tag tag={tag} />
                            )} */}
                        </div>



                        {state.selectedImages.length > 0 ?
                            <LinkContainer to="/view">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    style={{ margin: "5px" }}
                                >
                                    Show Images
                            </Button>
                            </LinkContainer>
                            : null}

                    </Col>
                    <Col md={12} lg={9}>
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