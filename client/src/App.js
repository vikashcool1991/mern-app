import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import SignUpSignInForm  from './components/SignupSignIn/form';
import Navbar from './components/NavBar/nav';

@inject('authStore') @observer
class App extends Component {

    async componentDidMount() {
        // await this.props.authStore.fetchProfile();
    }

    render() {
        const authStore = this.props.authStore;
        if(authStore.isAuthenticated){
            return (
                <Router>
                    <Navbar />
                </Router>
            );
        }
        return (
            <main>
                <SignUpSignInForm/>
            </main>
        );
    }
}

export default App;
