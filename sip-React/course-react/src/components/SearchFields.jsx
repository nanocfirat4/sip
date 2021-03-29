import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Col, Row } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import { Typography } from '@material-ui/core';


class SearchFields extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchTags: [],
            textFieldValue: '',
            newSearchCommentValue: props.searchComment
        };
    }


    // adjust thumbnail sizes
    handleSliderChange = (event, newValue) => {
        var items = document.getElementsByClassName("thumbnail_img")

        for (var i = 0; i < items.length; i++) {
            items[i].style.width = (newValue + "px");
            items[i].style.height = (newValue + "px");
        }
    };

    // Search when button is clicked
    handleSearch() {
        this.props.updateSearchComment(this.state.newSearchCommentValue);
        this.props.searchFunction(this.state.newSearchCommentValue);
    }

    // Update State when modifying Comment
    setNewComment(event) {
        this.setState({ newSearchCommentValue: event.target.value });
    }

    // Rendering
    render() {
        return (
            <form className={this.root} noValidate autoComplete="off">

                {/* OLD: Search by PACS ID of images
                <TextField
                    id="PictureID-search"
                    label="Picture ID"
                    type="search"
                    className="searchElement"
                /> */}
                <Row style={{ minHeight: "70px" }}>
                    <Col md={4}>
                        <Autocomplete
                            multiple
                            id="combo-box-demo"
                            options={
                                this.props.tags.map(tag => {
                                    return {
                                        name: tag.hashtagtxt,
                                        id: tag.id
                                    }
                                })
                            }
                            getOptionLabel={(option) => option.name}
                            renderInput={(params) => <TextField {...params} label="Tag" />}
                            style={{ width: "100%" }}
                        />
                    </Col>
                    <Col md={4}>
                        <TextField
                            id="comment-search"
                            label="Comments"
                            type="search"
                            defaultValue={this.props.searchComment}
                            onChange={this.setNewComment.bind(this)}
                            style={{ width: "100%" }}
                        />
                    </Col>
                    <Col md={2} xs={5}>
                        <Button
                            onClick={() => { this.handleSearch() }}
                            variant="contained"
                            color="primary"
                            style={{ margin: "5px" }}
                        >
                            Search
                        </Button>
                    </Col>
                    <Col md={2} xs={7}>
                        <Typography style={{ textAlign: "center" }}>
                            Thumbnail size
                        </Typography>
                        <Slider
                            getAriaValueText={this.valuetext}
                            aria-labelledby="discrete-slider"
                            valueLabelDisplay="auto"
                            step={50}
                            marks
                            min={50}
                            max={300}
                            defaultValue={150}
                            id="sizeSlider"
                            style={{ width: "100%" }}

                            onChange={this.handleSliderChange}
                        />

                    </Col>
                </Row>
            </form>
        );

    }
}
export default SearchFields