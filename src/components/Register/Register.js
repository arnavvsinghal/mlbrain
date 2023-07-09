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
    ////////////////////////////////super() vs super(props)////////////////////////////////
    // super(props):-This is necessary if you want to access this.props within the constructor
    //super():-This is necessary if you DONT want to access this.props within the constructor
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
        //This sends the POST request to the server to register the user.
        fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: this.state.registerName,
                email: this.state.registerEmail,
                password: this.state.registerPassword
                //The data to be sent to the server is first converted into JSON string.
            })
        })
            .then(res => res.json())
            // The response is then converted into JS Object.
            .then(user => {
                if (user.id) {
                    // If the registration was successful, the server will return the user credentials. Hence to check if the registration was successful, we can check if the response contains 'id' parameter or not.
                    this.props.loadUser(user);
                    this.props.routeChange('signin');
                }
            })
    }
    ////////////////////////////////REST IS SELF-EXPLANATORY////////////////////////////////
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
