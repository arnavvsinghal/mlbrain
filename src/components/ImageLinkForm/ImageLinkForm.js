import React, { Component } from 'react'
import './imagelinkform.css'
export default class ImageLinkForm extends Component {
    render() {
        const {onInputChange,onButtonSubmit} = this.props;
        return (
            <div className='link'>
                <div className='search'>
                    <input type='text' onChange={onInputChange} />
                    <button onClick={onButtonSubmit} style={{cursor:'pointer'}}>Detect</button>
                </div>
            </div>
        )
    }
}
