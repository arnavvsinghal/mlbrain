import React, { Component } from 'react'
import './register.css';
export default class Register extends Component {
    render() {
        return (
                <div className="registerformCard">
                    <div className='registersignUpForm'>
                        <div className='registersignUp'>
                            <p>Have an account? </p><span> Sign In! </span>
                        </div>
                        <h1>Welcome</h1>

                        <div className='registerform'>
                            <p>Register to continue</p>
                            <div className='registername'>
                                <label>Name</label><br />
                                <input
                                    type="test"
                                    name="name"
                                    id="name"
                                    placeholder='Your Name'
                                />
                            </div>
                            <div className='registermail'>
                                <label>Email</label><br />
                                <input
                                    type="email"
                                    name="email-address"
                                    id="email-address"
                                    placeholder='Your email address'
                                />
                            </div>
                            <div className='registerpass'>
                                <label>Set your Password</label><br />
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder='Set your Password'
                                />
                            </div>
                            <div className="register">
                                <input
                                    className='registerloginButton'
                                    type="submit"
                                    value="Submit"
                                />
                            </div>
                        </div>
                    </div>
                </div>
        )
    }
}
