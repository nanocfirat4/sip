import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'



export default class ViewMode extends Component {

    handleChange(previous, next) {
        console.log("changed Slide" + previous + " -> " + next) 
    }

    slideImages = [
        "http://dingyue.nosdn.127.net/0UDLpU6BsCNm9v9OpT0Dhn=nHKJFC6SMByz8bMWxFM=1t1531988836046compressflag.jpeg",
        "http://dingyue.nosdn.127.net/9sFTTWDQoHjxyIkU9wzm8CiDNVbq48Mwf2hyhgRghxA5O1527909480497compressflag.jpeg",
        "http://dingyue.nosdn.127.net/eSJPDtcP9NBvEOIMPyPLxwpJSZIu4D36qDss2RGQjNHBp1531990042001compressflag.jpeg",
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503235534249&di=4c198d5a305627d12e5dae4c581c9e57&imgtype=0&src=http%3A%2F%2Fimg2.niutuku.com%2Fdesk%2Fanime%2F0529%2F0529-17277.jpg"
    ];
    render() {
        return (

            <div id="imageView">
                <div>


                </div>

                <div className="slide-container">
                    <Slide
                        autoplay={false}
                        onChange={this.handleChange}    
                    >
                        {this.slideImages.map(image =>
                            <div className="each-slide">
                                <img src={image}
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
