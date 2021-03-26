import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'



export default class ViewMode extends Component {
    constructor(props) {
        super(props);
    }

    handleChange(previous, next) {
        console.log("changed Slide" + previous + " -> " + next) 
    }

    render() {
        return (

            <div id="imageView">
                <div className="slide-container">
                    <Slide
                        autoplay={false}
                        onChange={this.handleChange}    
                    >
                        {this.props.selectedImages.map(image =>
                            <div className="each-slide">
                                <img src={image.thumbnail}
                                    style={{
                                        display: 'block',
                                        margin: 'auto'
                                    }} />
                            </div>
                        )}
                    </Slide>
                </div>
                <Row>
                    <Col md={12} lg={3} id="bordered">
                        Kommentare und Tags
                        </Col>
                    <Col md={12} lg={9} id="bordered">
                    </Col>
                </Row>
                <Row>
                    <Col md={12} lg={3} id="bordered">
                        Kommentare und Tags in Common
                        </Col>
                    <Col md={12} lg={9} id="bordered">
                    </Col>
                </Row>
            </div>
        )
    }
}
