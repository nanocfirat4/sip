import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Container } from 'react-bootstrap'
// Components
import ViewMode from './components/ViewMode'
import AppNavBar from './components/AppNavBar'
import ThumbnailList from './components/ThumbnailList'
import About from './components/About'
// Global States
import Store from './Store'
// Styles
import './App.css'


const App = () => {
    return (
        <Store>
            <Container fluid style={{
                backgroundColor: "lightgray",
                minHeight: "100%"
            }}>

                <Router>
                    <AppNavBar />
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
export default App;
