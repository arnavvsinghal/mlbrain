import React, { Component } from 'react'
import './facerecognition.css'
export default class FaceRecognition extends Component {
  render() {
    const { imageURL, box, instructions } = this.props;
    return (
      <div className='facerecognition'>
        <p className='instructions'>{instructions}</p>
        <img id='inputImage' alt='' src={imageURL} />
        <div className='boundingBox' style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}></div>
      </div>
    )
  }
}
