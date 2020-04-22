import React, { Component } from "react";
import { observer, inject } from 'mobx-react';
import validator from 'validator';
import _ from 'lodash';
import './style.css';

@inject('authStore') 
@inject('registerStore') 
@observer
class SignUpSignInForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            login: { username: '', password: '' },
            signup: { email: '', password: '', username: '', confirmPassword: ''},
            loginErrors: {},
            signupErrors: {}
        };
        this.handleLoginChange = this.handleLoginChange.bind(this);
        this.handleSignupChange = this.handleSignupChange.bind(this);
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
        this.handleSignupSubmit = this.handleSignupSubmit.bind(this);
    }

    componentDidMount(){
        document.querySelector('.img-btn').addEventListener('click', function() {
            document.querySelector('.cont').classList.toggle('s-signup');
        });
    }

    handleLoginChange(e) {
        const { login } = { ...this.state };
        const error = {};
        const currentState = login;
        const { name, value } = e.target;
        currentState[name] = value;
        if(validator.isEmpty(value, {ignore_whitespace: true})){
            error[name] = `${name} can not be empty`;
        // } else if(name==='email' && !validator.isEmail(value)){
        //     error.email = 'Email is invalid.';
        } else if(name==='password' && !validator.matches(value, /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i)){
            error.password = 'password must be Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character( @$!%*?& )';
        }
        this.setState({ login: currentState, loginErrors: error});
    }

    handleSignupChange(e) {
        const { signup } = { ...this.state };
        const error = {};
        const currentState = signup;
        const { name, value } = e.target;
        currentState[name] = value;
        if(validator.isEmpty(value, {ignore_whitespace: true})){
            error[name] = `${name} can not be empty`;
        } else if(name==='email' && !validator.isEmail(value)){
            error.email = 'Email is invalid.';
        } else if(name==='password' && !validator.matches(value, /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i)){
            error.password = 'password must be Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character( @$!%*?& )';
        } else if(name==='confirmPassword' && value!==signup.password){
            error.confirmPassword = 'password does not match.';
        }
        this.setState({ signup: currentState, signupErrors: error});
    }

    async handleLoginSubmit(e) {
        e.preventDefault();
        if(_.isEmpty(this.state.loginErrors)){
            await this.props.authStore.login(this.state.login);
        } else {
            console.log("Form validation failed.");
        }
    }

    async handleSignupSubmit(e) {
        e.preventDefault();
        if(_.isEmpty(this.state.signupErrors)){
            await this.props.registerStore.register(this.state.signup);
        } else {
            console.log("Form validation failed.");
        }
    }

    render() {
        return (
            <div className="login-body">
        <div className="cont">
                <div className="form sign-in">
                    <h2>Sign In</h2>
                    <label>
                        <span>
                        UserName
                        </span>
                        <input className="input" type="text"
                                name="username"
                                id="username"
                                value={this.state.login.username}
                                onChange={this.handleLoginChange}
                                required
                        />
                        <span className="error">{this.state.loginErrors.username}</span>
                    </label>
                    <label>
                        <span>
                            Password
                        </span>
                        <input className="input" type="password" 
                                name="password"
                                id="password"
                                value={this.state.login.password}
                                onChange={this.handleLoginChange}
                                required
                         />
                        <span className="error">{this.state.loginErrors.password}</span>
                    </label>
                    <button className="lb submit" type="button" onClick={this.handleLoginSubmit}>Sign In</button>
                    <p className="forgot-pass">Forgot Password ?</p>
                    <div className="social-media">
                        <ul>
                            <li><img src="facebook.png"/></li>
                            <li><img src="twitter.png"/></li>
                            <li><img src="linkedin.png"/></li>
                            <li><img src="instagram.png"/></li>
                        </ul>
                    </div>
                </div>
                <div className="sub-cont">
                    <div className="img">
                        <div className="img-text m-up">
                            <h2>New Here?</h2>
                            <p>Sign Up</p>
                        </div>
                        <div className="img-text m-in">
                            <h2>Already Have An Account?</h2>
                            <p>Sign In</p>
                        </div>
                        <div className="img-btn">
                            <span className="m-up">Sign Up</span>
                            <span className="m-in">Sign In</span>
                        </div>
                    </div>
                    <div className="s-signup">
                        <div className="form sign-up">
                            <h2>Sign Up</h2>
                            <label>
                                <span>
                                    UserName
                                </span>
                                <input className="input" type="text" 
                                        name="username" 
                                        value={this.state.signup.username} 
                                        onChange={this.handleSignupChange}
                                        required
                                />
                                <span className="error">{this.state.signupErrors.username}</span>
                            </label>
                            <label>
                                <span>
                                    Email
                                </span>
                                <input className="input" type="email"
                                        name="email"
                                        value={this.state.signup.email}
                                        onChange={this.handleSignupChange}
                                        required
                                />
                                <span className="error">{this.state.signupErrors.email}</span>
                            </label>
                            <label>
                                <span>
                                    Password
                                </span>
                                <input className="input" type="password"
                                        name="password"
                                        value={this.state.signup.password}
                                        onChange={this.handleSignupChange}
                                        required
                                />
                                <span className="error">{this.state.signupErrors.password}</span>
                            </label>
                            <label>
                                <span>
                                    Confirm Password
                                </span>
                                <input className="input" type="password"
                                        name="confirmPassword"
                                        value={this.state.signup.confirmPassword}
                                        onChange={this.handleSignupChange}
                                        required
                                />
                                <span className="error">{this.state.signupErrors.confirmPassword}</span>
                            </label>
                            <button className="lb submit" type="button" onClick={this.handleSignupSubmit}>Sign Up Now</button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

export default SignUpSignInForm;