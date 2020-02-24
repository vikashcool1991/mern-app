import { Switch, Route, withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';
import HelloWorld from './components/hello-world';
import Home from './components/home';

const style = {
  borderRadius: '50%',
  width: '40px',
  height: '40px',
  margin: '90px auto',
  position: 'relative',
  borderTop: '3px solid rgba(0, 0, 0, 0.1)',
  borderRight: '3px solid rgba(0, 0, 0, 0.1)',
  borderBottom: '3px solid rgba(0, 0, 0, 0.1)',
  borderLeft: '3px solid #818a91',
  transform: 'translateZ(0)',
  animation: 'loading-spinner 0.5s infinite linear',
};

@withRouter
@inject('store')
@observer
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    Object.assign(this, this.props);
  }

  render() {
    if (this.store.common.appLoaded) {
      return (
        <div>
          <DevTools />
          <Switch>
            <Route exact path="/" component={HelloWorld} />
            <Route exact path="/home" component={Home} />
          </Switch>
        </div>
      );
    }
    return (
      <div style={style}>
        <style>
          {`
    @keyframes loading-spinner {
      0% { transform : rotate(0deg); }
      100% { transform : rotate(360deg); }
    }
    `}
        </style>
      </div>
    );
  }
}

export default App;
