import React, { Component } from 'react'
import { Row } from 'react-bootstrap';
import { CommentService } from '../services/CommentService';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { IconButton, Tooltip } from '@material-ui/core';
import keycloak from '../keycloak';

class Comment extends Component {
    handleDeleteComment(comment, forCurrent) {
        var i = 1;
        CommentService.authToken(keycloak.token);
        if (forCurrent) {
            CommentService.remove(this.props.currentImage.id, comment.id)
                .then(this.props.updateSelected())
        }
        else {
            this.props.selectedImages.map(image => {
                CommentService.remove(image.id, comment.id)
                    .then(() => {
                        i === this.props.selectedImages.length ? this.props.updateSelected() : i++;
                    })
            })
        }
    }

    getDeleteForCurrent() {
        return (
            <Tooltip title="Delete for current">
                <IconButton aria-label="delete">
                    <DeleteIcon
                        fontSize="medium"
                        onClick={() => this.handleDeleteComment(this.props.comment, true)}
                    />
                </IconButton>
            </Tooltip>
        )
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
                    backgroundColor: this.props.isCommon ? "gray" : "white",
                    padding: "10px",
                    borderTop: "1px solid",
                    borderBottom: "1px solid",
                }}
            >
                <Row>
                    {!this.props.isCommon ?
                        this.getDeleteForCurrent()
                        :
                        <div>
                            {this.getDeleteForCurrent()}
                            <Tooltip title="Delete for all">
                                <IconButton aria-label="delete">
                                    <DeleteForeverIcon
                                        fontSize="medium"
                                        onClick={() => this.handleDeleteComment(this.props.comment)}
                                    />
                                </IconButton>
                            </Tooltip>
                        </div>
                    }
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