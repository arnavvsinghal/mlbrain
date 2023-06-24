import React, { Component } from 'react'
import './form.css';
export default class Form extends Component {
    render() {
        return (
            <div className="formCard">
                <div className='signUpForm'>
                    <div className='signUp'>
                        <p>Dont Have an account? </p><span> Sign Up! </span>
                    </div>
                    <h1>Welcome</h1>

                    <div className='form'>
                        <p>Login to continue</p>
                        <div className='mail'>
                            <label>Email</label><br />
                            <input
                                type="email"
                                name="email-address"
                                id="email-address"
                                placeholder='Your email address'
                            />
                        </div>
                        <div className='pass'>
                            <label>Password</label><br />
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder='Your password'
                            />
                        </div>
                        <div className="">
                            <input
                                className='loginButton'
                                type="submit"
                                value="Log in"
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
