import React, { Component } from 'react'


class Comment extends Component {
    constructor(props) {
        super(props);
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
            >
                {date[2]}.{date[1]}.{date[0]}, {time[0]}:{time[1]}<br />
                {this.props.comment.commenttxt}
            </div>
        )
    }
}
export default Comment