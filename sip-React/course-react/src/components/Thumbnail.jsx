import React from 'react'
import { Card, CardActionArea, CardMedia, CardContent, makeStyles } from '@material-ui/core';




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
            for (var i = 0; i < this.props.selectedImages.length; i++) {
                if (this.props.selectedImages[i] === this.props.id) {
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

    useStyles = makeStyles(theme => ({
        root: {
            padding: "100px",
        },
    }));

    render() {
        return (
            <div class="thumbnail"
                onMouseEnter={this.handleEnter.bind(this)}
                onMouseLeave={this.handleLeave.bind(this)}
            >

                <Card
                    onClick={this.handleCheckClick}
                    style={{
                        backgroundColor: this.state.checked ? "lightblue" : "",
                    }}
                >
                    <CardActionArea>
                        {this.state.isHovered ? <div class="thumbnail_description">{this.props.description}</div> : ''}
                        <CardMedia
                            title={this.props.description}
                        />
                        <CardContent>
                            <img src={this.props.imgName} className="thumbnail_img" />
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>
        )
    }
}
export default Thumbnail