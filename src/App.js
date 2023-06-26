import React, { Component } from 'react';
import Signin from './components/Signin/Signin';
import SignoutButton from './components/SignoutButton/SignoutButton';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
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
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageURL: '',
      box: {},
    }
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
      leftCol: (face.left_col) * imageWidth+Number(rect.left),
      rightCol: Number(window.innerWidth)-Number(rect.right)+((1-face.right_col)* imageWidth),
      topRow: (face.top_row) * imageHeight+Number(rect.top),
      bottomRow:Number(window.innerHeight) -Number(rect.bottom)+((1-face.bottom_row) * imageHeight),
    };
    return box;
  }
  displayFaceBox = (box) => {
    this.setState({ box: box });
    console.log(box);
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
    console.log(event.target.value);
  }
  onButtonSubmit = () => {
    this.setState({ imageURL: this.state.input });
    console.log('click submit');
    fetch(`https://api.clarifai.com/v2/models/face-detection/outputs`, setupAPIRequest(this.state.input))
      .then(response => response.json())
      .then(result => this.displayFaceBox(this.calculateFaceLocation(result)))
      .catch(error => console.log('error', error));
  }
  render() {
    return (
      <div>
        {/* <Signin /> */}
        <SignoutButton />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
        <FaceRecognition imageURL={this.state.imageURL} box={this.state.box} />
        {/* console.log(this.state.input); */}
      </div>
    )
  }
}
