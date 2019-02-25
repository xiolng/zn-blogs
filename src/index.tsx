import React from 'react'
import ReactDOM from 'react-dom'
import {Router} from 'react-router-dom'
import {router} from './router'

import {createBrowserHistory} from 'history'
import {Provider} from 'mobx-react'
import {RouterStore, syncHistoryWithStore} from 'mobx-react-router'
import * as stores from '@/stores'
import './index.scss'
import 'antd/dist/antd.min.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

const browserHistory = createBrowserHistory()

const routerStore = new RouterStore()

// 同步路由与mobx的数据状态

const history = syncHistoryWithStore(browserHistory, routerStore)

ReactDOM.render(
    <Provider {...stores}>
        <Router history={history}>
            <App>
                {router()}
            </App>
        </Router>
    </Provider>
    , document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
