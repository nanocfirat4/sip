import React, { Component } from 'react'


class Comment extends Component {
    constructor(props) {
        super(props);
    }

    // Rendering
    render() {

        return (
            <div class="comment">
                {this.props.comment.timestamp}<br />
                {this.props.comment.commenttxt}<br /><br />
            </div>
        )
    }
}
export default Comment