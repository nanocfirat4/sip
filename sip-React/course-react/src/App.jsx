import React from 'react'
import About from './components/About'
import ThumbnailList from './components/ThumbnailList'
import AppNavBar from './components/AppNavBar'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './App.css'


function App () {
  return (
      <div className='container'>
          <Router>
            <AppNavBar />
            <Switch>
              <Route exact path='/' component={ThumbnailList} />
              <Route path='/about' component={About} />
            </Switch>
          </Router>
      </div>
  )
}
export default App
