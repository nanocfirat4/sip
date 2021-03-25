import React from 'react'
import { FormControlLabel, Checkbox } from '@material-ui/core';

class Thumbnail extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          isHovered: false,
          checked: false,
        };
    }

    handleCheckClick = () => {
        if (!this.state.checked)
            this.props.selectedImages.push(this.props.id);
        
        else {
            for( var i = 0; i < this.props.selectedImages.length; i++){ 
                if ( this.props.selectedImages[i] === this.props.id) { 
                    this.props.selectedImages.splice(i, 1); 
                }
            }
        }

        console.log(this.props.selectedImages);


        this.setState({
            checked: !this.state.checked
        });
    }

    handleEnter() {
        this.setState({
            isHovered: true 
        });
    }

    handleLeave() {
        this.setState({
            isHovered: false 
        });
    }

    render() {
        return (
            <div class="thumbnail" 
                onMouseEnter={this.handleEnter.bind(this)}
                onMouseLeave={this.handleLeave.bind(this)}
            >
                {this.state.isHovered ? <div class="thumbnail_description">{this.props.description}</div> : ''}

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={this.state.checked}
                            onChange={this.handleCheckClick}
                        />
                    }
                    label={
                        <img src={this.props.imgName} className="thumbnail_img" />
                    }
                    labelPlacement="top"
                />
            </div>
        )
    }
}
export default Thumbnail