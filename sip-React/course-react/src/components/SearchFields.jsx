import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Col, Row } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import { Typography } from '@material-ui/core';


class SearchFields extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            searchTags: [],
            textFieldValue: '',
            newSearchCommentValue: props.searchComment
        };
    }


    useStyles = makeStyles((theme) =>
        createStyles({
            root: {
                flexGrow: 1,
                maxWidth: 752,
            },
            demo: {
                backgroundColor: theme.palette.background.paper,
            },
            title: {
                margin: theme.spacing(4, 0, 2),
            },
        }),
    );

    handleSearch() {
        this.props.updateSearchComment(this.state.newSearchCommentValue);
        this.props.searchFunction(this.state.newSearchCommentValue);
    }

    handleChange(event) {
        this.setState({ newSearchCommentValue: event.target.value });
    }

    render() {
        return (
            <form className={this.root} noValidate autoComplete="off">

                {/* <TextField
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
                                this.props.tags.map((tag) => {
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
                            onChange={this.handleChange}
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

                            onChange={this.props.handleSliderChange}
                        />

                    </Col>
                </Row>
            </form>
        );

    }
}
export default SearchFields