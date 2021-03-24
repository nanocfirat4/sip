import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';



import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';

import DeleteIcon from '@material-ui/icons/Delete';

import './SearchFields.css'




class SearchFields extends Component {

    generate(element) {
        return [0].map((value) =>
            React.cloneElement(element, {
                key: value,
            }),
        );
    }

    useStyles = makeStyles((theme) =>
        createStyles({
            root: {
                flexGrow: 1,
                maxWidth: 752,
            },
            demo: {
                backgroundColor: theme.palette.background.paper,
            },
            title: {
                margin: theme.spacing(4, 0, 2),
            },
        }),
    );

    render() {



        return (

            <form className={this.root} noValidate autoComplete="off">


                <div id="search">
                    <div id="searchID" class="searchRow" >
                        <div class="searchElement">

                            <TextField
                                id="PictureID-search"
                                label="Picture ID"
                                type="search"
                            />
                        </div>
                        <div class="searchElement">

                            <TextareaAutosize
                                className = "resultArea"
                                rowsMax={4}
                                aria-label="maximum height"
                                placeholder="Maximum 4 rows"
                                defaultValue="Tag1 \n Tag2 \nTag3 \nTag4 \nTag5 \nTag6 \n."
                            />
                        </div>
                    </div>

                    <div id="searchTags" class="searchRow">
                        <div class="searchElement">
                            <TextField
                                id="Tags-search"
                                label="Tags"
                                type="search"
                                autoComplete=""
                                margin = "dense"
                                
                            />
                        </div>

                        <div class="searchElement">
                            <List >
                                {this.generate(
                                    <ListItem>
                                        <ListItemText
                                        />
                                        <ListItemSecondaryAction>
                                            <IconButton edge="end" aria-label="delete">
                                                <DeleteIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>,
                                )}
                            </List>

                        </div>


                    </div>

                    <div id="searchComment" class="searchRow">
                        <div class="searchElement">

                            <TextField
                                id="Comment-search"
                                label="Comments"
                                type="search"
                            />
                        </div>
                        <div class="searchElement">

                            <TextareaAutosize
                                className = "resultArea"
                                rowsMax={4}
                                aria-label="maximum height"
                                placeholder="Maximum 4 rows"
                                defaultValue="BliBlaBlo."
                            />
                        </div>
                    </div>

                </div>

            </form>
        );

    }
}
export default SearchFields