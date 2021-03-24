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

    selectImage(id) {
        console.log(id);
    }

    render() {
        return (
            <div class="thumbnail" id={"thumbnail_"+this.props.id} 
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