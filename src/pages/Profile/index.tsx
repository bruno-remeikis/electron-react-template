import React from 'react';
import { Link } from 'react-router-dom';

export default () =>
    <div id="profile-container">
        <h1>Profile</h1>

        <Link to='/'>Home</Link>
        <Link to='/profile'>Profile</Link>
    </div>