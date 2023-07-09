import React, { Component } from 'react';
import Signin from './components/Signin/Signin';
import SignoutButton from './components/SignoutButton/SignoutButton';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import backgroundimg from './Group.png';
import Registerpage from './components/Registerpage/Registerpage';
import './App.css';

const setupAPIRequest = (imageURL) => {
  // This function takes in the image link input by the user, setups the API request and returns the required object for the API to work.
  const PAT = '55c31f0e9520406aa82a8e3d8c293c28';
  //Personal Access Token for identification.
  const USER_ID = 'arnav';
  const APP_ID = 'test';
  const IMAGE_URL = imageURL;
  //JSON.stringify() is used to convert a JS object to a JSON string
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
  // raw and requestOptions are parameters required by the API and hence are created as per the documentation.
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
//initialState is defined to reset all the state variables to default values whenever required.
const initialState = {
  input: '',
  // input is the image link
  imageURL: '',
  // input is again stored in imageURL for use
  box: {},
  //decribes the box that appears on the image for showcasing the faces
  instructions: 'Hey there! Paste an image link in the search box above and click "Detect".',
  //displays specific information for the user
  route: 'signin',
  //controls the page to be displayed
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    password: '',
    entries: 0,
    joined: '',
  }
  //describes the user properties
};
export default class App extends Component {
  constructor() {
    super();
    // super() function is to call the constructor of the parent class. It is used when we need to access a few variables in the parent class
    this.state = initialState;
  }
  //functions in a rcc are declared like this: function=()=>{};
  calculateFaceLocation = (data) => {
    const face = data.outputs[0].data.regions[0].region_info.bounding_box;
    //gets the dimensions of the bounding box
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
    //returns the position of the box after taking into account the position of the image and the window size.
  }
  displayFaceBox = (box) => {
    this.setState({ box: box });
    //used to store the box position and size
    console.log(box);
  }
  loadUser = (userData) => {
    //used to store user info at the time of login 
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
    //stores the value of the input into a state
    this.setState({ input: event.target.value });
    console.log(event.target.value);
  }
  onButtonSubmit = () => {
    this.setState({ imageURL: this.state.input });
    this.setState({ instructions: '' });
    this.setState({ box: '' });
    console.log('click submit');
    //The following function is written from the documentation.
    fetch(`https://api.clarifai.com/v2/models/face-detection/outputs`, setupAPIRequest(this.state.input))
      .then(response => response.json())
      //The JSON string response is first converted to JS object.
      .then(result => {
        if (result) {
          //If result exists, id is sent to update the entries number of the user. 'PUT' method is used as entries are 'updated'.
          fetch('http://localhost:3000/image', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
            //The values are sent as JSON strings.
          }).then(res => res.json())
          //The response from the server is then converted into JS object. The server returns the new count of the user.
            .then(count => this.setState(Object.assign(this.state.user, { entries: count })));
            // Object.assign() is a JavaScript method that can be used to create a new object by merging multiple source objects into a target object. It is often used for creating a new state object in React components, especially when you want to update specific properties of the state while keeping the rest of the state intact.
            // So what it does here is :- {a:1, b:2, c:3} and {b:3} merge to form {a:1, b:3, c:3}. So the result is selective updation of specific properties of the state object without direct mutation of the original state
        }
        this.displayFaceBox(this.calculateFaceLocation(result))
        //used to display the box on the face
      })
      .catch((error) => {
        console.log(error);
        this.setState({ instructions: 'Invalid URL! Please try again.' });
      });
  }
  ////////////////////////////////REST IS SELF-EXPLANATORY////////////////////////////////
  routeChange = (route) => {
    if (route === 'signin') {
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
