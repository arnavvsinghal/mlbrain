import React, { Component } from 'react'
import './facerecognition.css'
export default class FaceRecognition extends Component {
  render() {
    const {imageURL,box}=this.props;
    return (
      <div>
        hello ji
        <img id='inputImage' alt='' src={imageURL} style={{width:'500px', height:'auto'}}/>
        <div className='boundingBox' style={{top:box.topRow, right:box.rightCol, bottom:box.bottomRow, left:box.leftCol}}></div>
      </div>
    )
  }
}
