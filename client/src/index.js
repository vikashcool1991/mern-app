import React from 'react'
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react'
import { Router, Switch, Route } from 'react-router'
import history from './services/history'
import authStore from './stores/AuthStore'
import userStore from './stores/UserStore'
import searchStore from './stores/SearchStore'
import registerStore from './stores/RegisterStore'
import App from './App'
import Home from './containers/Home'
import LoginContainer from './containers/LoginContainer'
import UserListContainer from './containers/UserListContainer'
import RegisterContainer from './containers/RegisterContainer'
import routes from './routes'

const stores = {
    authStore,
    userStore,
    searchStore,
    registerStore,
};

ReactDOM.render(
    <Provider { ...stores }>
        <App>
            <Router history={history}>
                <Switch>
                    <Route path={routes.login} component={LoginContainer}></Route>
                    <Route path={routes.sign_up} component={RegisterContainer}></Route>
                    <Route path={routes.users} component={UserListContainer}></Route>
                    <Route exact={true} path={routes.home} component={Home}></Route>
                </Switch>
            </Router>
        </App>
    </Provider>,
    document.getElementById('root')
);
