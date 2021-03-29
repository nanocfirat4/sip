import React, { Component } from 'react'
import ViewMode from './components/ViewMode'
import AppNavBar from './components/AppNavBar'
import { ImageService } from './services/ImageService'
import { CommentService } from './services/CommentService'
import { TagService } from './services/TagService'
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
      images: [],
      comments: [],
      tags: []
    };
  }

  // Load all images, Tags and Comments on App start
  componentDidMount() {
    this.setState({ isLoading: true })
    ImageService.authToken(keycloak.token)
    ImageService.findAll().then((res) => {
      this.setState({ images: res.data });
    });

    CommentService.authToken(keycloak.token)
    CommentService.findAll().then((res) => {
      this.setState({ comments: res.data });
    });
    
    TagService.authToken(keycloak.token)
    TagService.findAll().then((res) => {
      this.setState({ tags: res.data })
    });

    this.setState({ isLoading: false })
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
    const { isLoading, images, selectedImages, tags } = this.state;

    return (
      <div className='container'>
        {console.log("comments: " + this.state.comments)}
        {console.log("tags: " + this.state.tags)}

        {keycloak.token}

        <Router>
          <AppNavBar />
          <Switch>
            <Route exact path='/'>
              <ThumbnailList tags={tags} isLoading={isLoading} images={images} searchImages={this.searchImages} selectedImages={selectedImages} />
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
