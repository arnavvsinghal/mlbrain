import React, { Component } from 'react'
import Register from '../Register/Register';
import Group from '../Signin/images/Group.png';
import '../Signin/sigin.css';
export default class Registerpage extends Component {
    render() {
        return (
            <div>
                <div className='signIn'>
                    <div className='image'>
                        <h1>HELLO!</h1>
                        <p>This is a face recognition website.
                            It can be used to indentify human faces in images.</p>
                        <img src={Group} alt='background' />
                    </div>
                    <div className='signInForm'>
                        <Register />
                    </div>
                </div>
            </div>
        )
    }
}
