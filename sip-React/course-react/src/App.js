import React from 'react'
import CourseList from './components/CourseList'
import Course from './components/Course'
import About from './components/About'
import Home from './components/Home'
import keycloak from './keycloak'
import { ReactKeycloakProvider } from '@react-keycloak/web'
import { PrivateRoute } from './components/PrivateRoute'
import AppNavBar from './components/AppNavBar'
import Header from './components/Header'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:8081'
})



const eventLogger = (event, error) => {
    console.log('onKeycloakEvent', event, error)
}
const tokenLogger = (tokens) => {
    console.log('onKeycloakTokens', tokens)
}
function App() {
    return (
        
        
        <ReactKeycloakProvider authClient={keycloak} onEvent={eventLogger}
            onTokens={tokenLogger}>
            <div className='container'>
      
                <Router>
                    <AppNavBar />
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/about' component={About} />
                        <PrivateRoute path='/courses' component={CourseList} />
                        <PrivateRoute path='/edit-course/:id' component={Course} />
                    </Switch>
                </Router>
                <Header />
            </div>
            </ReactKeycloakProvider>
      
    )
}
export default App