import React from 'react';
import { BrowserRouter, HashRouter, Route, Switch } from "react-router-dom";

import Home from './pages/Home';
import Profile from './pages/Profile';

const App = () =>
{
  return (
    <HashRouter>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/profile" component={Profile}/>
        </Switch>     
    </HashRouter>    
  );
}

export default App;