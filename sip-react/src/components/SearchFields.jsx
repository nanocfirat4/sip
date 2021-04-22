import React, { useContext } from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Col, Row } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import { Fade, Grid, Tooltip, Typography, withStyles, Zoom } from '@material-ui/core';
import HelpIcon from '@material-ui/icons/Help';
import InputAdornment from '@material-ui/core/InputAdornment';
// Global states
import { Context } from '../Store';
import { ImageService } from '../services/ImageService';
import keycloak from '../keycloak';
import { LinkContainer } from 'react-router-bootstrap';

const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: 'lightgray',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'lightgray',
        },
        '& label': {
            color: 'lightgray',
        },
        width: "100%",
    },
})(TextField);

const InfoTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: '#d3d3d3',
        color: 'rgba(0, 0, 0, 0.87)',
        border: "1px solid gray",
        maxWidth: 420,
        fontSize: theme.typography.pxToRem(14),
    },
}))(Tooltip);



const SearchFields = () => {
    const [state, dispatch] = useContext(Context);



    // adjust thumbnail sizes
    function handleSliderChange(event, newValue) {
        dispatch({ type: "SET_THUMBNAIL_SIZE", payload: newValue })
    };

    // Search when button is clicked
    function handleSearch(tagValues, commentValues) {
        dispatch({ type: "SET_LOADING", payload: true });
        ImageService.authToken(keycloak.token);
        ImageService.findByFilter(commentValues === "" ? commentValues : state.searchComments, tagValues ? tagValues : state.searchTags)
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

    // Automatically search when new Tag is selected
    function handleTagChange(event, values) {
        dispatch({ type: "SET_SEARCH_TAGS", payload: values });
        handleSearch(values);
    }

    // Reset current search
    function handleReset() {
        dispatch({ type: "SET_SEARCH_COMMENTS", payload: "" });
        dispatch({ type: "SET_SEARCH_TAGS", payload: [] });
        handleSearch([], "");
    }


    // Rendering
    return (
        <div>
            <Row
                style={{
                    padding: "10px",
                    backgroundColor: '#4e565e',
                    expand: 'lg',
                    variant: 'dark',
                }}
            >
                <Col md={5}>
                    <Autocomplete
                        multiple
                        options={state.allTags}
                        value={state.searchTags}
                        filterSelectedOptions
                        getOptionLabel={(option) => option.hashtagtxt}
                        renderOption={(option) => (
                            <React.Fragment>
                                <div style={{
                                    width: "100%",
                                    overflow: "hidden",
                                }}>
                                    <div style={{
                                        float: "left"
                                    }}>
                                        {option.hashtagtxt}
                                    </div>
                                    <div style={{
                                        textAlign: "right",
                                        float: "right",
                                        color: "gray"
                                    }}>
                                        {option.hashtagCount}
                                    </div>
                                </div>
                            </React.Fragment>
                        )}
                        renderInput={(params) =>
                            <CssTextField
                                {...params}
                                label="Tags"
                            />
                        }
                        onChange={handleTagChange}
                    />
                </Col>
                <Col md={5}>
                    <div style={{

                    }}>
                        <CssTextField
                            id="comment-search"
                            label="Comments & Description"
                            type="search"
                            value={state.searchComments}
                            onChange={(event) => dispatch({ type: "SET_SEARCH_COMMENTS", payload: event.target.value })}
                            onKeyDown={handleKeyDown}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment>
                                        <InfoTooltip
                                            title="Free text search for keywords in comments or image description.
                                            Use a colon ',' for an 'AND' request. For example 'Azan, tooth' for 'Azan' AND 'tooth'.
                                            All the tags shown are 'AND' connected. With the search button only pictures with all tags will be selected."
                                        >
                                            <HelpIcon
                                                color="secondary"
                                            />
                                        </InfoTooltip>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </div>
                </Col>
                <Col md={2} xs={12}>
                    <Typography style={{ textAlign: "center" }}>
                        Thumbnail size
                    </Typography>
                    <Slider
                        color="secondary"
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
            <Row
                style={{
                    padding: "10px",
                    backgroundColor: '#4e565e',
                    expand: 'lg',
                    variant: 'dark',
                }}
            >
                <Button
                    onClick={() => handleSearch()}
                    variant="contained"
                    color="primary"
                    style={{ margin: "5px" }}
                >
                    Search
                </Button>
                <Button
                    onClick={() => handleReset()}
                    variant="contained"
                    color="primary"
                    style={{ margin: "5px" }}
                >
                    Reset
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
                    <LinkContainer to="/view"
                        style={{ color: "white" }}
                    >
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
            </Row>
        </div>
    );
}
export default SearchFields
