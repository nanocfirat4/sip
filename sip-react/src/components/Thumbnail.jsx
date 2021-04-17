import React, { useContext, useEffect, useState } from 'react'

// Global states
import { Context } from '../Store';

const Thumbnail = ({ image }) => {

    const [state, dispatch] = useContext(Context);

    const [checked, setChecked] = useState(() => {
        for (var i = 0; i < state.selectedImages.length; i++) {
            if (state.selectedImages[i] === image) {
                return true;
            }
        }
        return false;
    });



    
    // Add / remove images from selectedImages array
    function selectImage() {
        if (!checked)
            state.selectedImages.push(image);

        else {
            for (var i = 0; i < state.selectedImages.length; i++) {
                if (state.selectedImages[i] === image) {
                    state.selectedImages.splice(i, 1);
                }
            }
        }
        console.log(state.selectedImages);

        // this.props.updateMatchingComments();
        // this.props.updateMatchingTags();

        setChecked(!checked);
    }



    // Rendering
    return (
        <div className="thumbnail">
            <div
                onClick={selectImage}
                style={{
                    backgroundColor: checked ? "blue" : "white",
                    borderRadius: "5px",
                    padding: "8px",
                    margin: "2px"
                }}
            >
                <img 
                    src={"Pictures/Thumb/" + image.pacs_id + ".jpg"}
                    className="thumbnail_img"
                    title={image.description}
                />
            </div>
        </div>
    )
}
export default Thumbnail