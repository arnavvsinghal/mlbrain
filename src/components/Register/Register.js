import React, { Component } from 'react'
import './register.css';
export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            registerName: '',
            registerEmail: '',
            registerPassword: ''
        }
    }
    onNameChange = (event) => {
        this.setState({ registerName: event.target.value });
        console.log(event.target.value);
    }
    onEmailChange = (event) => {
        this.setState({ registerEmail: event.target.value });
        console.log(event.target.value)
    }
    onPasswordChange = (event) => {
        this.setState({ registerPassword: event.target.value });
        console.log(event.target.value)
    }
    onSubmitRegister = () => {
        fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: this.state.registerName,
                email: this.state.registerEmail,
                password: this.state.registerPassword
            })})
                .then(res => res.json())
                .then(user => {
                    if (user) {
                        this.props.loadUser(user);
                        this.props.routeChange('signin');
                    }
                })
        }
    render() {
        const { routeChange } = this.props;
        return (
            <div className="registerformCard">
                <div className='registersignUpForm'>
                    <div className='registersignUp'>
                        <p>Have an account? </p><span onClick={() => routeChange('signin')} style={{ cursor: 'pointer' }}> Sign In! </span>
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
                                onChange={this.onNameChange}
                            />
                        </div>
                        <div className='registermail'>
                            <label>Email</label><br />
                            <input
                                type="email"
                                name="email-address"
                                id="email-address"
                                placeholder='Your email address'
                                onChange={this.onEmailChange}
                            />
                        </div>
                        <div className='registerpass'>
                            <label>Set your Password</label><br />
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder='Set your Password'
                                onChange={this.onPasswordChange}
                            />
                        </div>
                        <div className="register">
                            <input
                                className='registerloginButton'
                                type="submit"
                                value="Submit"
                                onClick={this.onSubmitRegister}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
