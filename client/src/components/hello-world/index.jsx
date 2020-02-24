import React from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import style from './hello-world.css';

const HelloWorld = () => (
  <div className={style['hello-world']}>
    <Link to="/home">Home</Link>
    Hello World
  </div>
);

export default HelloWorld;
