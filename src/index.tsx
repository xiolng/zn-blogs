import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom'
import {router} from './router'
import './index.css';
import 'antd/dist/antd.min.css'
import App from './App';
import * as serviceWorker from './serviceWorker';

// @ts-ignore
const routerList = new router()
ReactDOM.render(
    <Router>
        <App>
            {routerList}
        </App>
    </Router>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();