import React from 'react';
import ReactDom from 'react-dom';

import Router from './router';

import './assets/styles/global.css';

const mainElement = document.createElement('div');

document.body.appendChild(mainElement);

const App = () =>
    <Router />

ReactDom.render(<App />, mainElement);