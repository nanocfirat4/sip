import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap';
import { CommentService } from '../services/CommentService';
import DeleteIcon from '@material-ui/icons/Delete';

class Comment extends Component {
    constructor(props) {
        super(props);
    }

    handleDeleteComment(comment) {
        this.props.selectedImages.map(image => {

            CommentService.remove(image.id, comment.id)

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
                    borderBottom: "1px solid"
                }}
            ><Row>
                    {date[2]}.{date[1]}.{date[0]}, {time[0]}:{time[1]}<br />
                    {this.props.comment.commenttxt}
                    <span class="material-icons">
                        <DeleteIcon
                            title="Delete"
                            size={1}
                            onClick={() => this.handleDeleteComment(this.props.comment)}

                        />
                        delete
                    </span>


                </Row>

            </div>
        )
    }
}
export default Comment