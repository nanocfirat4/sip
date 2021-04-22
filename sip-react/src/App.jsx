import React, { useEffect, useLayoutEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
// Components
import ViewMode from './components/ViewMode'
import AppNavBar from './components/AppNavBar'
import ThumbnailList from './components/ThumbnailList'
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
import Statistics from './components/Statistics';


const styles = (theme) => ({
    // Load app bar information from the theme
    toolbar: theme.mixins.toolbar,
});


const App = (props) => {
    const { classes } = props;

    const [hide, setHide] = useState(false)
    const [windowSize, setWindowSize] = useState(window.innerWidth)

    useEffect(() => {
        window.addEventListener('resize', resize);
    }, [])

    function resize() {
        setWindowSize(window.innerWidth);
    }

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

                    <Switch>
                        <Route exact path='/'>
                            <Toolbar>
                                <HideOnScroll {...props}>
                                    <AppBar position="fixed" >
                                        <AppNavBar setHide={setHide} />
                                        <SearchFields />
                                    </AppBar>
                                </HideOnScroll>
                            </Toolbar>
                            <div className={classes.toolbar} />
                            <div className={classes.toolbar} />
                            {windowSize < 770 ?
                                <div>
                                    <div className={classes.toolbar} />
                                    <div className={classes.toolbar} />
                                </div>
                            : null}

                            <ThumbnailList />
                        </Route>
                        <Route path='/stats'>
                            <AppBar>
                                <AppNavBar setHide={false} />
                            </AppBar>
                            <div className={classes.toolbar} style={{ marginTop: "20px" }} />
                            <Statistics />
                        </Route>
                        <Route path='/view'>
                            <AppBar>
                                <AppNavBar setHide={false} />
                            </AppBar>
                            <div className={classes.toolbar} style={{ marginTop: "20px" }} />
                            <ViewMode />
                        </Route>
                    </Switch>
                </Router>
            </Container>
        </Store>
    )
}
export default withStyles(styles)(App);