import React from 'react'
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react'
import authStore from './stores/AuthStore'
import userStore from './stores/UserStore'
import searchStore from './stores/SearchStore'
import registerStore from './stores/RegisterStore'
import App from './App'

const stores = {
    authStore,
    userStore,
    searchStore,
    registerStore,
};

ReactDOM.render(
    <Provider { ...stores }>
        <App />
    </Provider>,
    document.getElementById('root')
);
