import { HashRouter } from 'react-router-dom';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'mobx-react';
import { rehydrate, hotRehydrate } from 'rfx-core';
import registerServiceWorker from './registerServiceWorker';
import App from './App.jsx';
import stores from './stores/index';

const store = rehydrate() || stores;
const isProduction = process.env.NODE_ENV === 'production';

const renderApp = () => {
  render(
    <AppContainer>
      <HashRouter>
        <Provider store={isProduction ? store : hotRehydrate()}>
          <App />
        </Provider>
      </HashRouter>
    </AppContainer>,
    document.getElementById('app'),
  );
};
renderApp();
if (module.hot) {
  module.hot.accept(() => renderApp());
}
registerServiceWorker();
