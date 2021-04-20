import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
// Components
import ViewMode from './components/ViewMode'
import AppNavBar from './components/AppNavBar'
import ThumbnailList from './components/ThumbnailList'
import About from './components/About'
// MAterial UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import { withStyles } from "@material-ui/core/styles";
// Global States
import Store from './Store'
// Styles
import './App.css'
import SearchFields from './components/SearchFields';


const styles = (theme) => ({
    // Load app bar information from the theme
    toolbar: theme.mixins.toolbar,
});


const App = (props) => {
    const { classes } = props;

    const[hide, setHide] = useState(false)

    function HideOnScroll(props) {
        const { children, window } = props;
        const trigger = useScrollTrigger({ target: window ? window() : undefined });
    
        setHide(false)
    
        return (
            <Slide appear={false} direction="right" in={hide ? trigger : !trigger}>
                {children}
            </Slide>
        );
    }
    
    HideOnScroll.propTypes = {
        children: PropTypes.element.isRequired,
        window: PropTypes.func,
    };
    

    return (
        <Store>
            <Container fluid style={{
                backgroundColor: "lightgray",
                minHeight: "100%"
            }}>
                <Router>
                    <Toolbar>
                        <HideOnScroll {...props}>
                            <AppBar position="fixed">
                                <AppNavBar setHide={setHide} />
                                <SearchFields />
                            </AppBar>
                        </HideOnScroll>
                    </Toolbar>

                    <div className={classes.toolbar} style={{marginTop: "15px"}} />

                    <Switch>
                        <Route exact path='/'>
                            <ThumbnailList />
                        </Route>
                        <Route path='/about' component={About} />
                        <Route path='/view'>
                            <ViewMode />
                        </Route>
                    </Switch>
                </Router>
            </Container>
        </Store>
    )
}
export default withStyles(styles)(App);