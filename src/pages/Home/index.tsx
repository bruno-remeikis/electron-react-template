import React from 'react';

import { Link } from 'react-router-dom';

export default () =>
    <div id="home-container">
        <h1>Home</h1>

        <Link to='/'>Home</Link>
        <Link to='/profile'>Profile</Link>
    </div>