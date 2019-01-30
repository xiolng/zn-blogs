import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'

export const routeData = [
    {
        name: 'App',
        path: '/',
        exact: true
    }
]

export class router extends Component {
    render() {
        return (
            <Switch>
                {
                    routeData.map((item, index) => (
                        <Route exact={item.exact} path={item.path} component={import(`${item.name}`)} key={index} />
                    ))
                }
            </Switch>
        )
    }
}