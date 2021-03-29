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

                <Card
                    onClick={this.selectImage}
                    style={{
                        backgroundColor: this.state.checked ? "lightblue" : "",
                    }}
                >
                    <CardActionArea>
                        {this.state.isHovered ? <div class="thumbnail_description">{this.props.image.description}</div> : ''}
                        <CardMedia
                            title={this.props.image.description}
                        />
                        <CardContent>
                            <img src={this.props.image.thumbnail} className="thumbnail_img" />
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>
        )
    }
}
export default Thumbnail