import React, { Component } from 'react'
import keycloak from '../keycloak'
// Services
import { TagService } from '../services/TagService'
// Material-UI
import Chip from '@material-ui/core/Chip';
import { IconButton, Paper, Tooltip } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';


class Tag extends Component {
    handleDeleteCommonTag() {
        var i = 1;

        TagService.authToken(keycloak.token);
        this.props.selectedImages.map(image => {
            TagService.remove(image.id, this.props.tag).then(() => {
                i === this.props.selectedImages.length ? this.props.updateSelected() : i++;
            })
        })
    }

    handleDeleteTag() {
        var i = 1;

        TagService.authToken(keycloak.token);
        TagService.remove(this.props.currentImage.id, this.props.tag).then(() => {
            i === this.props.selectedImages.length ? this.props.updateSelected() : i++;
        });
    }


    getDeleteCurrentButton() {
        return (
            <React.Fragment>
                <Tooltip title={this.props.viewMode ? "Delete for current" : "Delete for selected"} style={{paddingLeft:"0"}}>
                    <IconButton aria-label="delete">
                        <DeleteIcon
                            fontSize="medium"
                            onClick={this.props.viewMode ? () => this.handleDeleteTag() : () => this.handleDeleteCommonTag()}
                        />
                    </IconButton>
                </Tooltip>
            </React.Fragment>
        )
    }

    getDeleteCommonButtons() {
        return (
            <React.Fragment style={{margin: "0", padding:"0"}}>
                <Tooltip title="Delete for current" style={{paddingLeft: "0", paddingRight: "0"}}>
                    <IconButton aria-label="delete">
                        <DeleteIcon
                            fontSize="medium"
                            onClick={() => this.handleDeleteTag()}
                        />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete for all">
                    <IconButton aria-label="delete">
                        <DeleteForeverIcon
                            fontSize="medium"
                            onClick={this.props.viewMode ? () => this.handleDeleteTag() : () => this.handleDeleteCommonTag()}
                        />
                    </IconButton>
                </Tooltip>
            </React.Fragment>
        )
    }

    // Rendering
    render() {

        return (
            <Chip
                label={this.props.tag.hashtagtxt}
                size="medium"
                deleteIcon={
                    this.props.viewMode ?
                        this.props.common ?
                            this.getDeleteCommonButtons()
                            : this.getDeleteCurrentButton()
                        : this.getDeleteCurrentButton()
                }
                onDelete={() => null}
                style={{
                    margin: "5px",
                    fontSize: "11pt"
                }}
            />
        )
    }
}
export default Tag