import React, { Component } from 'react'
import Form from '../Form/Form'
import './sigin.css'
import Group from '../Signin/images/Group.png';
export default class Signin extends Component {
    render() {
        return (
            <div className='signIn'>
                <div className='image'>
                    <h1>HELLO!</h1>
                    <p>This is a face recognition website.
                        It can be used to indentify human faces in images.</p>
                    <img src={Group} alt='background' />
                </div>
                <div className='signInForm'>
                    <Form />
                </div>
            </div>
        )
    }
}
