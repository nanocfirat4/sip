import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import Comment from './Comment';
import { PacsService } from '../services/PacsService'


export default class ViewMode extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            currentImage: this.props.selectedImages[0],
        };
    }


    handleChange(previous, next) {
        this.setState({currentImage: this.props.selectedImages[next]});
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
                                {PacsService.find(image.pacs_id).then(blob => 
                                    <img src={URL.createObjectURL(blob)}
                                        style={{
                                            display: 'block',
                                            margin: 'auto',
                                            maxWidth: '100%'
                                        }}
                                    />
                                )}
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
                        Kommentare und Tags in Common<br />
                        <div id="matchingComments">
                            {this.props.matchingComments.map(comment =>
                                <Comment comment={comment} />
                            )}
                        </div>
                    </Col>
                    <Col md={12} lg={9} id="bordered">
                        Kommentare zum aktuellen Bild<br />
                        {this.state.currentImage.imageCommentsList.map(comment => <Comment comment = {comment} />)} 

                    </Col>
                </Row>
            </div>
        )
    }
}
