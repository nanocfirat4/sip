import React, { Component } from 'react'
import { Row } from 'react-bootstrap';
import { CommentService } from '../services/CommentService';
import DeleteIcon from '@material-ui/icons/Delete';
import { Grid, IconButton, Tooltip } from '@material-ui/core';
import keycloak from '../keycloak';

class Comment extends Component {
    handleDeleteComment(comment) {
        var i = 1;
        CommentService.authToken(keycloak.token);
        this.props.selectedImages.map(image => {
            CommentService.remove(image.id, comment.id)
                .then(() => {
                    i === this.props.selectedImages.length ? this.props.updateSelected() : i++;
                })
        })
    }


    // Rendering
    render() {
        // Split timestamp of database for readable displaying
        var timestamp = this.props.comment.timestamp.split("T");
        var date = timestamp[0].split("-");
        var time = ((timestamp[1].split("+"))[0].split("."))[0].split(":");

        return (
            <div className="comment"
                style={{
                    backgroundColor: "white",
                    padding: "10px",
                    borderTop: "1px solid",
                    borderBottom: "1px solid",
                }}
            >
                <Row>
                    <Tooltip title="Delete">
                        <IconButton aria-label="delete">
                            <DeleteIcon
                                size={1}
                                onClick={() => this.handleDeleteComment(this.props.comment)}
                            />
                        </IconButton>
                    </Tooltip>
                    <div>
                        {date[2]}.{date[1]}.{date[0]}, {time[0]}:{time[1]}<br />
                        {this.props.comment.commenttxt}
                    </div>
                </Row>
            </div>
        )
    }
}
export default Comment