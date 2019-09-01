import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Blocks from './components/Blocks';
import { Router, Switch, Route } from 'react-router-dom';
import history from './history';


ReactDOM.render(
    <Router history={history}>
        <Switch>
            <Route exact={true} path='/' component={App} />
            <Route path='/blocks' component={Blocks} />
        </Switch>   
    </Router>,
    document.querySelector('#root')
)