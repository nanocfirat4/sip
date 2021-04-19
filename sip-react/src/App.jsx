import React from 'react';
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
// Global States
import Store from './Store'
// Styles
import './App.css'
import SearchFields from './components/SearchFields';


function HideOnScroll(props) {
    const { children, window } = props;

    const trigger = useScrollTrigger({ target: window ? window() : undefined });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
};


export default function App(props) {
    return (
        <Store>
            <Container fluid style={{
                backgroundColor: "lightgray",
                minHeight: "100%"
            }}>
                <Router>
                    <HideOnScroll {...props}>
                        <AppBar position= "fixed">
                            <AppNavBar />
                            <SearchFields />
                        </AppBar>
                    </HideOnScroll>
                    <Toolbar />
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