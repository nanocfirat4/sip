import React, { Component } from 'react'
import ViewMode from './components/ViewMode'
import AppNavBar from './components/AppNavBar'
import { ImageService } from './services/ImageService'
import keycloak from './keycloak'
import ThumbnailList from './components/ThumbnailList'
import About from './components/About'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './App.css'

class App extends Component {
  constructor(props) {
    super(props);

    this.searchImages = this.searchImages.bind(this)

    this.state = {
      isLoading: false,
      selectedImages: [],
      images: []
    };
  }

  // Load all images on App start
  componentDidMount() {
    this.setState({ isLoading: true })
    ImageService.authToken(keycloak.token)
    ImageService.findAll().then((res) => {
      this.setState({ images: res.data, isLoading: false });
    });
  }

  // Search images
  searchImages(textTokens) {
    this.setState({ isLoading: true })
    ImageService.authToken(keycloak.token)
    ImageService.findByFilter(textTokens, []).then((res) => {
      this.setState({ images: res.data, isLoading: false });
    });
  }



  render() {
    const { isLoading, images, selectedImages } = this.state;

    return (
      <div className='container'>
        <Router>
          <AppNavBar />
          <Switch>
            <Route exact path='/'>
              <ThumbnailList isLoading={isLoading} images={images} searchImages={this.searchImages} selectedImages={selectedImages} />
            </Route>
            <Route path='/about' component={About} />
            <Route path='/view'>
              <ViewMode selectedImages={this.state.selectedImages} />
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }
}
export default App
