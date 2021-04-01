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
import { PacsService } from '../services/PacsService';
import Tag from './Tag';

class ThumbnailList extends Component {
    constructor(props) {
        super(props);

        this.updateSearchComment = this.updateSearchComment.bind(this);
        this.handleAddCommentText = this.handleAddCommentText.bind(this);
        this.handleAddComment = this.handleAddComment.bind(this);

        this.state = {
            searchComment: "",
            newComment: "",
        };
    }


    // Set the last searched Comment
    updateSearchComment(newComment) {
        this.setState({ searchComment: newComment });
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
    handleAddCommentText(event) {
        this.setState({ newComment: event.target.value })
    }



    render() {
        const { isLoading, images, searchImages, selectedImages, tags, matchingComments, updateMatchingComments, matchingTags } = this.props;


        return (
            isLoading ? <p>Loading...</p> : (
                <div className="mt-3">
                    <SearchFields searchFunction={searchImages} searchComment={this.state.searchComment}
                        updateSearchComment={this.updateSearchComment} tags={tags}
                        style={{ backgroundColor: "lightgray" }} />

                    <Row>
                        <Col md={12} lg={3}>
                            {/* Comments -> Show comments of selected images and add new ones */}
                            <div id="matchingComments">
                                {matchingComments.map(comment =>
                                    <Comment comment={comment} />
                                )}
                            </div>

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


                            {/* Tags -> Show tags of selected images and add new ones */}
                            <div id="matchingTags">
                                {/* {matchingTags.map(tag =>
                                    <Tag tag={tag} />
                                )} */}
                            </div>

                            <TextField
                                id="add_tag"
                                label="New Tag"
                                onChange={this.handleAddCommentText}
                                style={{ width: "100%" }}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                style={{ margin: "5px" }}
                                onClick={this.handleAddComment}
                            >
                                Save Tag
                            </Button>

                            {this.props.selectedImages.length > 0 ?
                                <LinkContainer to="/view">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        style={{ margin: "5px" }}
                                        onClick={() => PacsService.find()}
                                    >
                                        Show Images
                                </Button>
                                </LinkContainer>
                            : null}

                        </Col>
                        <Col md={12} lg={9}>
                            {images.map(image =>
                                <Thumbnail updateMatchingComments={updateMatchingComments} selectedImages={selectedImages} image={image} />
                            )}
                        </Col>
                    </Row>

                    {/* <table className="table">
                        <thead>
                            <tr><th>ID</th><th>Description</th><th>Thumbnail</th><th>PACS</th></tr>
                        </thead>
                        <tbody>
                            {images.map(image =>
                                <tr key={image.id}>
                                    <td>{image.id}</td>
                                    <td>{image.description}</td>
                                    <td>{image.thumbnail}</td>
                                    <td>{image.pacs_id}</td>
                                </tr>
                            )}
                        </tbody>
                    </table> */}
                </div>
            )
        )
    }
}
export default withRouter(ThumbnailList)