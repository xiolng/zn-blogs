import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'

import Home from '@Views/home'
import Edit from '@Views/edit'
import NewBlogs from '@Views/newBlogs'
import Details from '@Views/details'

export interface routeChild {
    name: string,
    path: string,
    exact: boolean,
    component: any,
    hideMenu: boolean
}

export interface routeItem {
    name: string,
    path: string,
    exact: boolean,
    component: any,
    routes?: routeChild[],
    hideMenu: boolean,
    parentName: string,
    keys: string
}

export const routeData: routeItem[] = [
    {
        name: 'list',
        path: '/',
        exact: true,
        component: Home,
        hideMenu: false,
        parentName: 'Home',
        keys: '0'
    },
    {
        name: 'edit',
        path: '/edit/:id',
        exact: true,
        component: Edit,
        hideMenu: false,
        parentName: 'Home',
        keys: '1'
    },
    {
        name: 'newBlogs',
        path: '/newBlogs',
        exact: true,
        component: NewBlogs,
        hideMenu: false,
        parentName: 'Home',
        keys: '2'
    },
    {
        name: 'Details',
        path: '/details/:id',
        exact: true,
        component: Details,
        hideMenu: false,
        parentName: 'Home',
        keys: '3'
    },

]

export const router = () => (
    routeData.map((item, index) => (
        <Switch key={index}>
            <Route exact={item.exact} path={item.path} component={item.component} />
        </Switch>
    ))

)