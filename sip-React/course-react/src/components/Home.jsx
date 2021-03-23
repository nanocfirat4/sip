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
            var items = document.getElementsByClassName("thumbnail_img")

            for (var i = 0; i < items.length; i++) {
                items[i].style.width = (newValue + "px");
                items[i].style.height = (newValue + "px");
            }
        };
        
        return (
            isLoading ? <p>Loading...</p> : (
                <div className="mt-3">
                    <Slider
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
                            {images.map(image =>
                                <Thumbnail imgName={image.thumbnail} id={image.id} description={image.description} />
                            )}
                        </div>
                        <div id="comments_tags">
                            Kommentare und Tags
                </div>
                    </div>
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