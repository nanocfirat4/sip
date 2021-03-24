import React from 'react'
import CourseList from './components/CourseList'
import Course from './components/Course'
import About from './components/About'
import ThumbnailList from './components/ThumbnailList'
import { PrivateRoute } from './components/PrivateRoute'
import AppNavBar from './components/AppNavBar'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './App.css'


function App () {
  return (
      <div className='container'>
          <Router>
            <AppNavBar keycloak />
            <Switch>
              <Route exact path='/' component={ThumbnailList} />
              <Route path='/about' component={About} />
              <PrivateRoute path='/courses' component={CourseList} />
              <PrivateRoute path='/edit-course/:id' component={Course} />
            </Switch>
          </Router>
      </div>
  )
}
export default App
