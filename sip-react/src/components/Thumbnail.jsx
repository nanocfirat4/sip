import React, { useContext, useEffect, useState } from 'react'
// Global states
import { Context } from '../Store';

const Thumbnail = ({ image }) => {

    const [state, dispatch] = useContext(Context);

    const [checked, setChecked] = useState(false);

    useEffect(() => {
        var isChecked = false;
        for (var i = 0; i < state.selectedImages.length; i++) {
            if (state.selectedImages[i].id === image.id) {
                isChecked = true;
            }
        }
        setChecked(isChecked)

    }, [state.selectedImages])



    
    // Add / remove images from selectedImages array
    function selectImage() {
        var selected = state.selectedImages;
        if (!checked) {
            selected.push(image);
            dispatch({type: "SET_SELECTED_IMAGES", payload: selected});
        }
        else {
            for (var i = 0; i < state.selectedImages.length; i++) {
                if (state.selectedImages[i].id === image.id) {
                    selected.splice(i, 1);
                    dispatch({type: "SET_SELECTED_IMAGES", payload: selected});
                    break;
                }
            }
        }

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
                    alt={image.description}
                />
            </div>
        </div>
    )
}
export default Thumbnail