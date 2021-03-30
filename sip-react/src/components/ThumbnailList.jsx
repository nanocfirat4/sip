import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Thumbnail from './Thumbnail'
import SearchFields from './SearchFields'
import { withRouter } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'

class ThumbnailList extends Component {
    constructor(props) {
        super(props);

        this.updateSearchComment = this.updateSearchComment.bind(this);

        this.state = {
            searchComment: "",
        };
    }


    valuetext(value) {
        return `${value}px`;
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

    handleShowImages() {
        this.setState({ showViewMode: true})
    }


    render() {
        const { isLoading, images, searchImages, selectedImages } = this.props;


        return (
            isLoading ? <p>Loading...</p> : (
                <div className="mt-3">
                    <SearchFields handleSliderChange={this.handleSliderChange} searchFunction={searchImages}
                        searchComment={this.state.searchComment} updateSearchComment={this.updateSearchComment} />



                    <Row>
                        <Col md={12} lg={3} id="bordered">
                            Kommentare und Tags

                            <LinkContainer to="/view">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    style={{ margin: "5px" }}
                                >
                                        Show Images
                                </Button>
                            </LinkContainer>

                        </Col>
                        <Col md={12} lg={9} id="bordered">
                            {images.map(image =>
                                <Thumbnail selectedImages={selectedImages} image={image} />
                            )}
                        </Col>
                    </Row>

                    {/* <table className="table">
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
                    </table> */}
                </div>
            )
        )
    }
}
export default withRouter(ThumbnailList)