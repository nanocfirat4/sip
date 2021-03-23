import React, { Component } from 'react'

import Thumbnail from './Thumbnail'
import Slider from '@material-ui/core/Slider';

import { ImageService } from '../services/ImageService'
import keycloak from '../keycloak'
import { withRouter } from 'react-router-dom'

class ThumbnailList extends Component {
    state = {
        isLoading: false,
        images: []
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

    render() {
        const { isLoading, images } = this.state;

        const handleSliderChange = (event, newValue) => {
            var items = document.getElementsByClassName("thumbnail")

            for (var i = 0; i < items.length; i++) {
                items[i].style.width = (newValue + "px");
                items[i].style.height = (newValue * 0.8 + "px");
            }
        };
        
        return (
            isLoading ? <>yes{    console.log('Starting Request')}</> : (
                <div className="mt-3">
                    <Slider
                        defaultValue={30}
                        getAriaValueText={this.valuetext}
                        aria-labelledby="discrete-slider"
                        valueLabelDisplay="auto"
                        step={50}
                        marks
                        min={50}
                        max={400}
                        defaultValue={250}

                        onChange={handleSliderChange}
                    />
                    <div class="row">
                        <div id="thumbnail_view">
                            <Thumbnail />
                            <Thumbnail />
                            <Thumbnail />
                            <Thumbnail />
                            <Thumbnail />
                            <Thumbnail />
                            <Thumbnail />
                            <Thumbnail />
                            <Thumbnail />
                            <Thumbnail />
                            <Thumbnail />
                            <Thumbnail />
                        </div>
                        <div id="comments_tags">
                            Kommentare und Tags<br></br>
                            {keycloak.token}
                </div>
                    </div>
                    <table className="table">
                        <thead>
                            <tr><th>ID</th><th>Description</th><th>Thumbnail</th><th>PACS</th></tr>
                        </thead>
                        <tbody>
                            {images.map(image =>
                                <tr key={image.id}>
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