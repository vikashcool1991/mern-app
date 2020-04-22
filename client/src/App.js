import React, { Component } from 'react'
import { Router, Switch, Route } from 'react-router'
import history from './services/history'
import { observer, inject } from 'mobx-react'
import routes from './routes'
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
                <div>
                    <Navbar>
                        <Router history={history}>
                            <Switch>
                                {/* <Route exact={true} path={routes.home} component={Navbar}></Route> */}
                                {/* <Route path={routes.login} component={SignUpSignInForm}></Route> */}
                            </Switch>
                        </Router>
                    </Navbar>
                </div>
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
