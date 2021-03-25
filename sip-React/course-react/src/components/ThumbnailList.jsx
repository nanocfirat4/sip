import React, { Component } from 'react'

import Thumbnail from './Thumbnail'
import SearchFields from './SearchFields'

import { ImageService } from '../services/ImageService'
import keycloak from '../keycloak'
import { withRouter } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap';


class ThumbnailList extends Component {
    constructor(props) {
        super(props);

        this.updateSearchComment = this.updateSearchComment.bind(this);
        this.searchImages = this.searchImages.bind(this);

        this.state = {
            isLoading: false,
            selectedImages: [],
            searchComment: "",
            images: []
        };
    }

    componentDidMount() {
        this.setState({ isLoading: true })
        ImageService.authToken(keycloak.token)
        ImageService.findAll().then((res) => {
            this.setState({ images: res.data, isLoading: false });
        });
    }

    valuetext(value) {
        return `${value}px`;
    }

    searchImages(textTokens) {
        this.setState({ isLoading: true })
        ImageService.authToken(keycloak.token)
        ImageService.findByFilter(textTokens, []).then((res) => {
            this.setState({ images: res.data, isLoading: false });
        });
    }

    updateSearchComment(newComment) {
        this.setState({ searchComment: newComment });
    }

    handleSliderChange = (event, newValue) => {
        var items = document.getElementsByClassName("thumbnail_img")

        for (var i = 0; i < items.length; i++) {
            items[i].style.width = (newValue + "px");
            items[i].style.height = (newValue + "px");
        }
    };


    render() {
        const { isLoading, images, searchComment } = this.state;


        return (
            isLoading ? <p>Loading...</p> : (
                <div className="mt-3">
                    <SearchFields handleSliderChange={this.handleSliderChange} searchFunction={this.searchImages}
                        searchComment={searchComment} updateSearchComment={this.updateSearchComment} />

                    <Row>
                        <Col md={12} lg={3} id="bordered">
                            Kommentare und Tags
                        </Col>
                        <Col md={12} lg={9} id="bordered">
                            {images.map(image =>
                                <Thumbnail selectedImages={this.state.selectedImages} imgName={image.thumbnail} id={image.id} description={image.description} />
                            )}
                        </Col>
                    </Row>



                    <table className="table">
                        <thead>
                            <tr><th>ID</th><th>Description</th><th>Thumbnail</th><th>PACS</th></tr>
                        </thead>
                        <tbody>
                            {images.map(image =>
                                <tr key={image.id}>
                                    <td>{image.id}</td>
                                    <td>{image.description}</td>
                                    <td>{image.thumbnail}</td>
                                    <td>{image.pacs_id}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )
        )
    }
}
export default withRouter(ThumbnailList)