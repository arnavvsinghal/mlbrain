import React, { Component } from 'react';
import Signin from './components/Signin/Signin';
import SignoutButton from './components/SignoutButton/SignoutButton';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import backgroundimg from './Group.png';
import Registerpage from './components/Registerpage/Registerpage';
import './App.css';

const setupAPIRequest = (imageURL) => {

  const PAT = '55c31f0e9520406aa82a8e3d8c293c28';
  const USER_ID = 'arnav';
  const APP_ID = 'test';
  const IMAGE_URL = imageURL;
  const raw = JSON.stringify({
    "user_app_id": {
      "user_id": USER_ID,
      "app_id": APP_ID
    },
    "inputs": [
      {
        "data": {
          "image": {
            "url": IMAGE_URL
          }
        }
      }
    ]
  });
  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Key ' + PAT
    },
    body: raw
  };
  return requestOptions;
}

const initialState = {
  input: '',
  imageURL: '',
  box: {},
  instructions: 'Hey there! Paste an image link in the search box above and click "Detect".',
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    password: '',
    entries: 0,
    joined: '',
  }
};
export default class App extends Component {
  constructor() {
    super();
    this.state =initialState;
  }

  calculateFaceLocation = (data) => {
    const face = data.outputs[0].data.regions[0].region_info.bounding_box;
    console.log(face);
    const image = document.getElementById('inputImage');
    var rect = image.getBoundingClientRect();
    console.log(rect.top, rect.right, rect.bottom, rect.left);
    const imageWidth = Number(image.width);
    const imageHeight = Number(image.height);
    console.log(imageWidth, imageHeight);
    const box = {
      leftCol: (face.left_col) * imageWidth + Number(rect.left),
      rightCol: Number(window.innerWidth) - Number(rect.right) + ((1 - face.right_col) * imageWidth),
      topRow: (face.top_row) * imageHeight + Number(rect.top),
      bottomRow: Number(window.innerHeight) - Number(rect.bottom) + ((1 - face.bottom_row) * imageHeight),
    };
    return box;
  }
  displayFaceBox = (box) => {
    this.setState({ box: box });
    console.log(box);
  }
  loadUser = (userData) => {
    this.setState({
      user: {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        password: userData.password,
        entries: userData.entries,
        joined: userData.joined
      }
    });
  }
  onInputChange = (event) => {
    this.setState({ input: event.target.value });
    console.log(event.target.value);
  }
  onButtonSubmit = () => {
    this.setState({ imageURL: this.state.input });
    this.setState({ instructions: '' });
    this.setState({ box: '' });
    console.log('click submit');
    fetch(`https://api.clarifai.com/v2/models/face-detection/outputs`, setupAPIRequest(this.state.input))
      .then(response => response.json())
      .then(result => {
        if (result) {
          fetch('http://localhost:3000/image', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          }).then(res => res.json())
            .then(count => this.setState(Object.assign(this.state.user, { entries: count })));
        }
        this.displayFaceBox(this.calculateFaceLocation(result))
      })
      .catch((error) => {
        console.log(error);
        this.setState({ instructions: 'Invalid URL! Please try again.' });
      });
  }
  routeChange = (route) => {
    if(route==='signin'){
      this.setState(initialState);
    }
    this.setState({ route: route });
  }
  render() {
    if (this.state.route === 'signin') {
      return (<Signin loadUser={this.loadUser} routeChange={this.routeChange} />);
    }
    else if (this.state.route === 'register') {
      return (<Registerpage loadUser={this.loadUser} routeChange={this.routeChange} />);
    }
    else if (this.state.route === 'main') {
      return (
        <div className='App'>
          <SignoutButton routeChange={this.routeChange} />
          <div className='apiWrapper'>
            <div className='submitButton'>
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
              <FaceRecognition imageURL={this.state.imageURL} box={this.state.box} instructions={this.state.instructions} />
            </div>
            <div className='img-container'>
              <p className='appInstructions'>Make sure the image links end with jpg or png. Smiley!</p>
              <img alt='' src={backgroundimg} />
            </div>
          </div>
        </div>
      );
    }
  }
}
