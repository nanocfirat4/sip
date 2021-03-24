import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';

import './SearchFields.css'

class SearchFields extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            searchTags: [],
            textFieldValue: ''
        };
    }


    generate(element) {
        return this.state.searchTags.map((value) =>
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

    // Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
    allTags = [
        { name: 'The Shawshank Redemption' },
        { name: 'The Godfather' },
        { name: 'The Godfather: Part II' },
        { name: 'The Dark Knight' },
        { name: '12 Angry Men' },
        { name: "Schindler's List", year: 1993 },
    ];

    update(e) {
        this.props.updateSearchComment(e.target.value);
    }



    render() {
        
        return (
            <form className={this.root} noValidate autoComplete="off">

                <TextField
                    id="PictureID-search"
                    label="Picture ID"
                    type="search"
                    className="searchElement"
                />

                <Autocomplete
                    multiple
                    id="combo-box-demo"
                    className="searchElement"
                    options={this.allTags}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => <TextField {...params} label="Tag" />}
                />

                <TextField
                    id="Comment-search"
                    label="Comments"
                    type="search"
                    className="searchElement"
                    value={this.props.searchComment}
                    onChange={e => this.update(e)}
                /> 
            </form>
        );

    }
}
export default SearchFields