import React, { Component } from 'react'
import keycloak from '../keycloak'
// Services
import { TagService } from '../services/TagService'
// Material-UI
import Chip from '@material-ui/core/Chip';


class Tag extends Component {
    handleDeleteTag(tag) {
        var i = 1;

        TagService.authToken(keycloak.token);
        this.props.selectedImages.map(image => {
            TagService.remove(image.id, tag).then(() => {
                i === this.props.selectedImages.length ? this.props.updateSelected() : i++;
            })
        })

    }

    // Rendering
    render() {

        return (
            <Chip
                label={this.props.tag.hashtagtxt}
                size="medium"
                onDelete={() => this.handleDeleteTag(this.props.tag)}
                style={{
                    margin: "5px",
                    fontSize: "11pt"
                }}
            />
        )
    }
}
export default Tag