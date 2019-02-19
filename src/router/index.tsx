import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'

import Home from '@Views/home'
import Edit from '@Views/edit'
import NewBlogs from '@Views/newBlogs'
import Details from '@Views/details'

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
        path: '/edit/:id',
        exact: true,
        component: Edit,
        hideMenu: false
    },
    {
        name: 'newBlogs',
        path: '/newBlogs',
        exact: true,
        component: NewBlogs,
        hideMenu: false
    },
    {
        name: 'Details',
        path: '/details/:id',
        exact: true,
        component: Details,
        hideMenu: false
    },

]

export const router = () => (
    routeData.map((item, index) => (
        <Switch key={index}>
            <Route exact={item.exact} path={item.path} component={item.component} />
        </Switch>
    ))

)