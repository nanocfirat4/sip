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
import { Redirect } from "react-router-dom";
import { useKeycloak } from '@react-keycloak/web'
import {courseService} from "./services/CourseService";

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

    const { key } = useKeycloak()
    console.log(key)
    courseService.authToken(key.token)
    return (


        <ReactKeycloakProvider authClient={keycloak} onEvent={eventLogger}
            onTokens={tokenLogger}>
            <div className='container'>


                <Router>
                    {!key?.authenticated &&
                    (key.login)
                    }

                    {key?.authenticated &&

                    <AppNavBar />&&

                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/about' component={About} />
                        <PrivateRoute path='/courses' component={CourseList} />
                        <PrivateRoute path='/edit-course/:id' component={Course} />
                    </Switch> &&                   
                    <Header />
                }
                            

                    </Router>
                
            </div>
        </ReactKeycloakProvider >

    )
}
export default App