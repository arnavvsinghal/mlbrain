import React, { Component } from 'react'
import './form.css';
////////////////////////////////HIGHLY RECOMMENDED TO READ THE REGISTER.JS FILE COMMENTS FOR UNDERSTANDING THE WORKINGS HERE////////////////////////////////
export default class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signinEmail: '',
            signinPassword: ''
        }
    }

    onSigninEmail = (event) => {
        this.setState({ signinEmail: event.target.value });
    }

    onSigninPassword = (event) => {
        this.setState({ signinPassword: event.target.value });
    }

    onSubmitSignin = () => {
        fetch('http://localhost:3000/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.signinEmail,
                password: this.state.signinPassword
            })
        })
            .then(resp => resp.json())
            .then(data => {
                console.log('signinData', data);
                if (data.id) {
                    this.props.loadUser(data);
                    console.log(data);
                    this.props.routeChange('main');
                }
            })
        // console.log(this.state);
    }
    render() {

        return (
            <div className="formCard">
                <div className='signUpForm'>
                    <div className='signUp'>
                        <p>Dont Have an account? </p><span onClick={() => this.props.routeChange('register')} style={{ cursor: 'pointer' }}> Sign Up! </span>
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
                                onChange={this.onSigninEmail}
                            />
                        </div>
                        <div className='pass'>
                            <label>Password</label><br />
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder='Your password'
                                onChange={this.onSigninPassword}
                            />
                        </div>
                        <div className="">
                            <input
                                className='loginButton'
                                type="submit"
                                value="Log in"
                                onClick={this.onSubmitSignin}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
