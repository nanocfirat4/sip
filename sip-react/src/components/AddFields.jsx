import React, { useContext } from 'react'
import keycloak from '../keycloak'
// Services
import { CommentService } from '../services/CommentService'
import { TagService } from '../services/TagService'
// Material-UI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
// Global states
import { Context } from '../Store';
import { ImageService } from '../services/ImageService';


export default function AddFields({ currentImage }) {
    const [state, dispatch] = useContext(Context);


    // Add new Comment to all selected images
    function handleAddComment(forImage) {
        if (state.newCommentTxt !== "") {
            var i = 1;

            CommentService.authToken(keycloak.token)
            CommentService.add(state.newCommentTxt)
                .then(res => {
                    if (forImage) {
                        CommentService.assignComment(forImage.id, res.data.id)
                            .then(() => updateSelected())
                    }
                    else {
                        state.selectedImages.map((image) => {
                            CommentService.assignComment(image.id, res.data.id)
                                .then(() => {
                                    i === state.selectedImages.length ? updateSelected() : i++;
                                })
                        })
                    }
                })
            dispatch({ type: "SET_NEW_COMMENT_TEXT", payload: "" })
        }
    }

    // Add new Tag to all selected images
    function handleAddTag(forImage) {
        if (state.newTagTxt !== "") {
            var double = false;
            var i = 1;

            TagService.authToken(keycloak.token)

            state.allTags.map(tag => {
                if (tag.hashtagtxt.toLowerCase() === state.newTagTxt.toLowerCase()) {
                    if (forImage){
                        TagService.assignTag(forImage.id, tag.id)
                            .then(() => updateSelected())
                    }
                    else {
                        state.selectedImages.map((image) => {
                            TagService.assignTag(image.id, tag.id)
                                .then(() => {
                                    i === state.selectedImages.length ? updateSelected() : i++;
                                })
                        })
                    }
                    double = true;
                }
            });

            if (!double) {
                TagService.add(state.newTagTxt.toLowerCase())
                    .then((res) => {
                        if (forImage) {
                            TagService.assignTag(forImage.id, res.data.id)
                                .then(() => updateSelected())
                        }
                        else {
                            state.selectedImages.map((image) => {
                                TagService.assignTag(image.id, res.data.id)
                                    .then(() => {
                                        i === state.selectedImages.length ? updateSelected() : i++;
                                    })
                            })
                        }
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


    // Search when enter ist pressed in comments field
    function handleKeyDownComment(e) {
        if (e.key === 'Enter') {
            currentImage ? handleAddComment(currentImage) : handleAddComment();
        }
    }
    // Search when enter ist pressed in comments field
    function handleKeyDownTag(e) {
        if (e.key === 'Enter') {
            currentImage ? handleAddTag(currentImage) : handleAddTag();
        }
    }


    return (
        <div>
            <Autocomplete
                freeSolo
                options={state.allTags}
                getOptionLabel={(option) => option.hashtagtxt}
                renderOption={(option) => (
                    <React.Fragment>
                        <div style={{
                            width: "100%",
                            overflow: "hidden",
                        }}>
                            <div style={{
                                float: "left"
                            }}>
                                {option.hashtagtxt}
                            </div>
                            <div style={{
                                textAlign: "right",
                                float: "right",
                                color: "gray"
                            }}>
                                {option.hashtagCount}
                            </div>
                        </div>
                    </React.Fragment>
                )}
                renderInput={(params) =>
                    <TextField
                        {...params}
                        label="New Tag"
                        defaultValue={state.newTagTxt}
                        inputProps={{
                            ...params.inputProps,
                            autoComplete: 'new-password', // disable autocomplete and autofill
                        }}
                        onKeyDown={handleKeyDownTag}
                    />
                }
                onInputChange={(event, value) =>
                    value ? dispatch({ type: "SET_NEW_TAG_TEXT", payload: value }) : null
                }

                style={{ width: "100%" }}
            />

            {currentImage ?
                <Button
                    variant="contained"
                    color="primary"
                    style={{ margin: "5px" }}
                    onClick={() => handleAddTag(currentImage)}
                >
                    Save for current
                </Button>
            : null}

            <Button
                variant="contained"
                color="primary"
                style={{ margin: "5px" }}
                onClick={() => handleAddTag()}
            >
                Save for all
            </Button>

            <TextField
                id="add_comment"
                label="New Comment"
                value={state.newCommentTxt}
                onChange={(event) => dispatch({ type: "SET_NEW_COMMENT_TEXT", payload: event.target.value })}
                style={{ width: "100%" }}
                onKeyDown={handleKeyDownComment}
            />
            {currentImage ?
                <Button
                    variant="contained"
                    color="primary"
                    style={{ margin: "5px" }}
                    onClick={() => handleAddComment(currentImage)}
                >
                    Save for current
                </Button>
            : null}

            <Button
                variant="contained"
                color="primary"
                style={{ margin: "5px" }}
                onClick={() => handleAddComment()}
            >
                Save for all
            </Button>

        </div>
    )
}