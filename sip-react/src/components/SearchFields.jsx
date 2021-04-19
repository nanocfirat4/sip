import React, { useContext } from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Col, Row } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import { Typography } from '@material-ui/core';
// Global states
import { Context } from '../Store';
import { ImageService } from '../services/ImageService';
import keycloak from '../keycloak';
import { LinkContainer } from 'react-router-bootstrap';


const SearchFields = () => {
    const [state, dispatch] = useContext(Context);

    // adjust thumbnail sizes
    function handleSliderChange(event, newValue) {
        var items = document.getElementsByClassName("thumbnail_img")

        for (var i = 0; i < items.length; i++) {
            items[i].style.width = (newValue + "px");
            items[i].style.height = (newValue + "px");
        }
    };

    // Search when button is clicked
    function handleSearch() {
        dispatch({ type: "SET_LOADING", payload: true });
        ImageService.authToken(keycloak.token);
        ImageService.findByFilter(state.searchComments, state.searchTags)
            .then(res => dispatch({ type: "SET_ALL_IMAGES", payload: res.data }))
            .then(dispatch({ type: "SET_LOADING", payload: false }))
        dispatch({ type: "SET_SELECTED_IMAGES", payload: [] })
    }

    // Search when enter ist pressed in comments field
    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }


    // Rendering
    return (
        <Row
            id="searchfields"
            style={{
                padding: "10px",
                backgroundColor: '#4e565e',
                expand: 'lg',
                variant: 'dark',
            }}
        >
            <Col md={3}>
                <Autocomplete
                    multiple
                    id="combo-box-demo"
                    options={state.allTags}
                    defaultValue={state.searchTags}
                    filterSelectedOptions
                    getOptionLabel={(option) => option.hashtagtxt}
                    renderInput={(params) =>
                        <TextField
                            {...params}
                            label="Tags"
                        />
                    }
                    style={{ width: "100%" }}
                    onChange={(event, values) => dispatch({ type: "SET_SEARCH_TAGS", payload: values })}
                />
            </Col>
            <Col md={3}>
                <TextField
                    id="comment-search"
                    label="Comments"
                    type="search"
                    defaultValue={state.searchComments}
                    onChange={(event) => dispatch({ type: "SET_SEARCH_COMMENTS", payload: event.target.value })}
                    style={{ width: "100%" }}
                    onKeyDown={handleKeyDown}
                />
            </Col>
            <Col md={4} xs={12}>
                <Button
                    onClick={handleSearch}
                    variant="contained"
                    color="primary"
                    style={{ margin: "5px" }}
                >
                    Search
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    style={{ margin: "5px" }}
                    onClick={() => dispatch({ type: "SET_SELECTED_IMAGES", payload: state.allImages })}
                >
                    Select all
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    style={{ margin: "5px" }}
                    onClick={() => dispatch({ type: "SET_SELECTED_IMAGES", payload: [] })}
                >
                    unselect all
                        </Button>
                {/* Display 'Show Images'-Button */}
                {state.selectedImages.length > 0 ?
                    <LinkContainer to="/view">
                        <Button
                            variant="contained"
                            color="primary"
                            style={{ margin: "5px" }}
                            onClick={() => dispatch({ type: "SET_LOADING", payload: true })}
                        >
                            Show Images
                                    </Button>
                    </LinkContainer>
                    : null}

            </Col>
            <Col md={2} xs={12}>
                <Typography style={{ textAlign: "center" }}>
                    Thumbnail size
                </Typography>
                <Slider
                    // getAriaValueText={this.valuetext}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={50}
                    marks
                    min={50}
                    max={300}
                    defaultValue={150}
                    id="sizeSlider"
                    style={{ width: "100%" }}
                    onChange={handleSliderChange}
                />
            </Col>
        </Row>
    );
}
export default SearchFields