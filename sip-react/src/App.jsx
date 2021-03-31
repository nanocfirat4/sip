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
import { Container } from 'react-bootstrap'

class App extends Component {
  constructor(props) {
    super(props);

    this.searchImages = this.searchImages.bind(this)
    this.updateComments = this.updateComments.bind(this)
    this.updateMatchingComments = this.updateMatchingComments.bind(this)
    
    this.state = {
      isLoading: false,
      selectedImages: [],
      images: [],
      comments: [],
      tags: [],
      matchingComments: []
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

  // Search images by txt
  searchImages(textTokens) {
    this.setState({ isLoading: true });
    ImageService.authToken(keycloak.token);
    ImageService.findByFilter(textTokens, []).then((res) => {
      this.setState({
        images: res.data,
        selectedImages: [],
        matchingComments: [],
        matchingTags: [],
        isLoading: false
      });
    });
  }

  // Check which comments do all selected images have in common
  updateMatchingComments() {
    var allComments = this.state.selectedImages.map(image => { return image.imageCommentsList.map(comment => { return comment.id }) });
    var matchingComments = []

    if (allComments.length > 0) {
      // Filter Comments
      var result = allComments.shift().filter(function (v) {
        return allComments.every(function (a) {
          return a.indexOf(v) !== -1;
        });
      });
      // Add Comments to state
      for (var j = 0; j < this.state.comments.length; j++) {
        for (var i = 0; i < result.length; i++) {
          if (this.state.comments[j].id == result[i]) {
            matchingComments.push(this.state.comments[j]);
          }
        }
      }
    }
    this.setState({
      matchingComments: matchingComments
    });
  }


  // Update all Coments
  updateComments() {
    CommentService.authToken(keycloak.token)
    CommentService.findAll().then((res) => {
      this.setState({ comments: res.data });
    });
  }



  render() {
    const { isLoading, images, selectedImages, tags, matchingComments, matchingTags } = this.state;

    return (
      <Container fluid style={{
        backgroundColor: "lightgray",
        minHeight: "100%"
      }}>

        {keycloak.token}

        <Router>
          {keycloak.token}
          <AppNavBar />
          <Switch>
            <Route exact path='/'>
              <ThumbnailList tags={tags} isLoading={isLoading} images={images} searchImages={this.searchImages} selectedImages={selectedImages}
                updateComments={this.updateComments} matchingTags={matchingTags} matchingComments={matchingComments}
                updateMatchingComments={this.updateMatchingComments} />
            </Route>
            <Route path='/about' component={About} />
            <Route path='/view'>
              <ViewMode selectedImages={this.state.selectedImages}  matchingComments = {matchingComments} updateMatchingComments={this.updateMatchingComments}/>
            </Route>
          </Switch>
        </Router>
      </Container>
    )
  }
}
export default App
