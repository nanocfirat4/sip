import React, { Component } from 'react'


class Tag extends Component {
    constructor(props) {
        super(props);
    }

    // Rendering
    render() {

        return (
            <div class="tag">
                {this.props.tag.timestamp}<br />
                {this.props.tag.hashtagtxt}<br /><br />
            </div>
        )
    }
}
export default Tag