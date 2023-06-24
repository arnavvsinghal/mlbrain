import React, { Component } from 'react'
import Form from '../Form/Form'
import './sigin.css'
export default class Signin extends Component {
    render() {
        console.log(window.innerWidth);
        return (
            <div className='signIn'>
                <div className='image'>
                    <p>This is a face recognition website.
                        It can be used to indentify human faces in images.</p>
                    {/* <img src={backgroundimg} alt='background' /> */}
                </div>
                <div className='signInForm'>
                    <Form />
                </div>
            </div>
        )
    }
}
