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
import { createMuiTheme } from '@material-ui/core/styles';


const styles = (theme) => ({
    // Load app bar information from the theme
    toolbar: theme.mixins.toolbar,
});


const App = (props) => {
    const { classes } = props;

    const [hide, setHide] = useState(false)

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

    const buttonTheme = createMuiTheme({
        palette: {
            primary: {
                main: '#4a646c',
            },
            secondary: {
                // This is green.A700 as hex.
                main: '#81c784',
            },
        },
    });


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
                                    <AppNavBar setHide={setHide} buttonTheme={buttonTheme}/>
                                        <SearchFields buttonTheme={buttonTheme}/>
                                    </AppBar>
                                </HideOnScroll>
                            </Toolbar>
                            <div className={classes.toolbar} style={{ marginTop: "20px" }} />

                            <ThumbnailList />
                        </Route>
                        <Route path='/about'>
                            <AppBar>
                                <AppNavBar setHide={false} />
                            </AppBar>
                            <div className={classes.toolbar} style={{ marginTop: "20px" }} />
                            <About />
                        </Route>
                        <Route path='/view'>
                            <AppBar>
                                <AppNavBar setHide={false} buttonTheme={buttonTheme}/>
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