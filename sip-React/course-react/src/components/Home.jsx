import React from 'react'
import { Link } from 'react-router-dom'

import Thumbnail from './Thumbnail'
import Slider from '@material-ui/core/Slider';

function valuetext(value) {
    return `${value}px`;
}


function Home () {
    const handleSliderChange = (event, newValue) => {
        var items = document.getElementsByClassName("thumbnail")

        for (var i = 0; i < items.length; i++) {
            items[i].style.width=(newValue+"px");
            items[i].style.height=(newValue*0.8+"px");
        }
    };

    return (
        <div className="mt-3">
            <Slider
                defaultValue={30}
                getAriaValueText={valuetext}
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
                    Kommentare und Tags
                </div>
            </div>
        </div>
    )
}
export default Home