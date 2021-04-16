import React, { Component } from 'react'
import { Card, CardActionArea, CardMedia, CardContent } from '@material-ui/core';


class Thumbnail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isHovered: false,
            checked: this.initCheck(),
        };
    }


    // Check if the image was selected before
    initCheck() {
        for (var i = 0; i < this.props.selectedImages.length; i++) {
            if (this.props.selectedImages[i] === this.props.image) {
                return true;
            }
        }
        return false;
    }

    
    // Add / remove images from selectedImages array
    selectImage = () => {
        if (!this.state.checked)
            this.props.selectedImages.push(this.props.image);

        else {
            for (var i = 0; i < this.props.selectedImages.length; i++) {
                if (this.props.selectedImages[i] === this.props.image) {
                    this.props.selectedImages.splice(i, 1);
                }
            }
        }
        console.log(this.props.selectedImages);
        this.props.updateMatchingComments();
        this.props.updateMatchingTags();
        this.setState({
            checked: !this.state.checked
        });
    }


    // Display and hide description on hover
    handleEnter() {
        this.setState({
            isHovered: true
        });
    }

    handleLeave() {
        this.setState({
            isHovered: false
        });
    }

    // Rendering
    render() {
        return (
            <div class="thumbnail"
                onMouseEnter={this.handleEnter.bind(this)}
                onMouseLeave={this.handleLeave.bind(this)}
            >
                <div
                    onClick={this.selectImage}
                    style={{
                        backgroundColor: this.state.checked ? "blue" : "white",
                        borderRadius: "5px",
                        padding: "8px",
                        margin: "2px"
                    }}
                >
                    <div className="thumbnail_description"
                        style={{
                            display: this.state.isHovered ? "block" : "none",
                        }}
                    >{this.props.image.description}</div>
                    <img src={"Pictures/Thumb/" + this.props.image.pacs_id + ".jpg"} className="thumbnail_img" />
                </div>
            </div>
        )
    }
}
export default Thumbnail