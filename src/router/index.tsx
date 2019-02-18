import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'

import Home from '../views/home'
import Edit from '../views/edit'

interface routeChild {
    name: string,
    path: string,
    exact: boolean,
    component: any,
    hideMenu: boolean
}

interface routeItem {
    name: string,
    path: string,
    exact: boolean,
    component: any,
    routes?: routeChild[],
    hideMenu: boolean
}

export const routeData: routeItem[] = [
    {
        name: 'App',
        path: '/',
        exact: true,
        component: Home,
        hideMenu: false
    },
    {
        name: 'edit',
        path: '/edit',
        exact: true,
        component: Edit,
        hideMenu: false
    }
]

export const router = () => (
    routeData.map((item, index) => (
        <Switch key={index}>
            <Route exact={item.exact} path={item.path} component={item.component} />
        </Switch>
    ))

)