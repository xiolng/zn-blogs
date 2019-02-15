import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import App from "../App"

export const routeData = [
    {
        name: 'App',
        path: '/',
        exact: true,
        component: App
    }
]

export class router extends Component {
    render() {
        return (
            <Switch>
                {
                    routeData.map((item, index) => (
                        <Route exact={item.exact} path={item.path} component={App} key={index} />
                    ))
                }
            </Switch>
        )
    }
}