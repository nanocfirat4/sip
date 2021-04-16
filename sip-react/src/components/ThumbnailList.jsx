import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Thumbnail from './Thumbnail'
import SearchFields from './SearchFields'
import Comment from './Comment';
import { withRouter } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { CommentService } from '../services/CommentService'
import TextField from '@material-ui/core/TextField';
import keycloak from '../keycloak'
import Tag from './Tag';
import { TagService } from '../services/TagService'



class ThumbnailList extends Component {
    constructor(props) {
        super(props);
        this.updateSearchTags = this.updateSearchTags.bind(this);
        this.updateSearchComment = this.updateSearchComment.bind(this);
        this.handleAddCommentText = this.handleAddCommentText.bind(this);
        this.handleAddComment = this.handleAddComment.bind(this);
        this.handleAddTagText = this.handleAddTagText.bind(this);
        this.handleAddTag = this.handleAddTag.bind(this);
        this.updateSelectedTagObject = this.updateSelectedTagObject.bind(this);
        this.state = {
            searchComment: "",
            searchTags: [],
            newComment: "",
            newTag: "",
            selectedTagObject: []
        };
    }


    // Set the last searched Comment
    updateSearchComment(newComment) {
        this.setState({ searchComment: newComment });
    }
    // Set the last searched Tag

    updateSearchTags(newTags) {
        this.setState({ searchTags: newTags });
    }

    updateSelectedTagObject(values) {
        this.setState({ selectedTagObject: values })
    }

    // Add new Comment to all selected images
    handleAddComment() {
        CommentService.authToken(keycloak.token)
        CommentService.add(this.state.newComment).then((res) => {
            this.props.selectedImages.map((image) => {
                CommentService.assignComment(image.id, res.data.id)
            })
        })
    }

    // Add new Tag to all selected images
    handleAddTag() {
        TagService.authToken(keycloak.token)
        TagService.add(this.state.newTag).then((res) => {
            this.props.selectedImages.map((image) => {
                TagService.assignTag(image.id, res.data.id)
            })
        })
    }

    handleAddCommentText(event) {
        this.setState({ newComment: event.target.value })
    }

    handleAddTagText(event) {
        this.setState({ newTag: event.target.value })
    }

    render() {
        const { isLoading, images, searchImages, selectedImages, tags, matchingComments, updateMatchingComments,updateMatchingTags, matchingTags } = this.props;


        return (
            isLoading ? <p>Loading...</p> : (
                <div className="mt-3">
                    <SearchFields
                        searchFunction={searchImages}
                        searchComment={this.state.searchComment}
                        searchTags={this.state.searchTags}
                        updateSearchComment={this.updateSearchComment}
                        updateSelectedTagObject={this.updateSelectedTagObject}
                        updateSearchTags={this.updateSearchTags}
                        tags={tags}
                        selectedTagObject={this.state.selectedTagObject}
                    />



                    <Row>
                        <Col md={12} lg={3}>
                            {/* Comments -> Show comments of selected images and add new ones */}
                            {matchingComments.length > 0 ?
                                <div id="matchingComments"
                                    style={{
                                        borderRadius: "20px",
                                        backgroundColor: "white",
                                        padding: "10px"
                                    }}
                                >
                                    {matchingComments.map(comment =>
                                        <Comment comment={comment} />
                                    )}
                                </div>
                                : null}

                            {/* <ChipInput
                                label=" Tags"
                                value={matchingTags}
                                //onAdd={(chip) => this.handleAddChip(chip)}
                                onDelete={(chip, index) => this.handleDeleteChip(chip, index)}
                            /> */}


                            <TextField
                                id="add_comment"
                                label="New Comment"
                                onChange={this.handleAddCommentText}
                                style={{ width: "100%" }}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                style={{ margin: "5px" }}
                                onClick={this.handleAddComment}
                            >
                                Save Comment
                            </Button>

                            <TextField
                                id="add_tag"
                                label="New Tag"
                                onChange={this.handleAddTagText}
                                style={{ width: "100%" }}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                style={{ margin: "5px" }}
                                onClick={this.handleAddTag}
                            >
                                Save Tag
                            </Button>
                            {/* Tags -> Show tags of selected images and add new ones */}
                            <div id="matchingTags">
                                {/* {matchingTags.map(tag =>
                                    <Tag tag={tag} />
                                )} */}
                            </div>



                            {this.props.selectedImages.length > 0 ?
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
                            {images.map(image =>
                                <Thumbnail updateMatchingTags={updateMatchingTags} updateMatchingComments={updateMatchingComments} selectedImages={selectedImages} image={image} />
                            )}
                        </Col>
                    </Row>
                </div>
            )
        )
    }
}
export default withRouter(ThumbnailList)