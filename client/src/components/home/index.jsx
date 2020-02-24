import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import style from './home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={style.home}>
        <Link to="/">
          <h2>back</h2>
        </Link>
        Home
      </div>
    );
  }
}

export default Home;
