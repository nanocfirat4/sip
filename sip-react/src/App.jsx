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
import Store from './Store'

class App extends Component {
  constructor(props) {
    super(props);

    this.searchImages = this.searchImages.bind(this)
    this.updateComments = this.updateComments.bind(this)
    this.updateMatchingComments = this.updateMatchingComments.bind(this)
    this.updateMatchingTags = this.updateMatchingTags.bind(this)
    this.updateImages = this.updateImages.bind(this)
    this.updateComments = this.updateComments.bind(this)
    this.updateTags = this.updateTags.bind(this)

    this.state = {
      isLoading: false,
      selectedImages: [],
      images: [],
      comments: [],
      tags: [],
      matchingComments: [],
      matchingTags: [],

    };
  }

  // Load all images, Tags and Comments on App start
  componentDidMount() {
    this.setState({ isLoading: true })
    this.updateImages()
    this.updateComments()
    this.updateTags()
    this.setState({ isLoading: false })
  }

  updateImages() {
    ImageService.authToken(keycloak.token)
    ImageService.findAll().then((res) => {
      this.setState({ images: res.data });
    });
  }

  updateComments() {
    CommentService.authToken(keycloak.token)
    CommentService.findAll().then((res) => {
      this.setState({ comments: res.data });
    });
  }

  updateTags() {
    TagService.authToken(keycloak.token)
    TagService.findAll().then((res) => {
      this.setState({ tags: res.data })
      console.log(this.state.tags)
    });

    this.setState({ isLoading: false })
  }


  // Search images by txt
  searchImages(textTokens, searchTags) {
    this.setState({ isLoading: true })
    ImageService.authToken(keycloak.token)
    ImageService.findByFilter(textTokens, searchTags).then((res) => {
      this.setState({
        images: res.data,
        selectedImages: [],
        matchingComments: [],
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

  updateMatchingTags() {
    var allTags = this.state.selectedImages.map(image => { return image.imageHashtagsList.map(tag => { return tag.id }) });
    var matchingTags = []

    if (allTags.length > 0) {
      var result = allTags.shift().filter(function (v) {
        return allTags.every(function (a) {
          return a.indexOf(v) !== -1;
        });
      });

      for (var j = 0; j < this.state.tags.length; j++) {
        for (var i = 0; i < result.length; i++) {
          if (this.state.tags[j].id == result[i]) {
            matchingTags.push(this.state.tags[j].hashtagtxt);
          }
        }
      }
    }
    this.setState({
      matchingTags: matchingTags
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
    const { isLoading, images, selectedImages, tags, matchingComments, updateMatchingTags, matchingTags } = this.state;

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
                <ThumbnailList tags={tags}
                  updateImages={this.updateImages}
                  updateTags={this.updateTags}
                  isLoading={isLoading}
                  images={images}
                  searchImages={this.searchImages}
                  selectedImages={selectedImages}
                  matchingTags={matchingTags}
                  updateComments={this.updateComments}
                  matchingComments={matchingComments}
                  updateMatchingComments={this.updateMatchingComments}
                  updateMatchingTags={this.updateMatchingTags} />

              </Route>
              <Route path='/about' component={About} />
              <Route path='/view'>
                <ViewMode selectedImages={this.state.selectedImages} matchingComments={matchingComments} updateMatchingComments={this.updateMatchingComments} />
              </Route>
            </Switch>
          </Router>
        </Container>
      </Store>
    )
  }
}
export default App
