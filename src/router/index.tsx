import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'

import Home from '@Views/home'
import Edit from '@Views/edit'
import NewBlogs from '@Views/newBlogs'
import Details from '@Views/details'

import NotFound from '@Views/NotFound'

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
    keys: string,
    auth: boolean
}

export const routeData: routeItem[] = [
    {
        name: 'list',
        path: '/',
        exact: true,
        component: Home,
        hideMenu: false,
        parentName: 'Home',
        keys: '0',
        auth: false
    },
    {
        name: 'edit',
        path: '/edit/:id',
        exact: true,
        component: Edit,
        hideMenu: false,
        parentName: 'Home',
        keys: '1',
        auth: true
    },
    {
        name: 'newBlogs',
        path: '/newBlogs',
        exact: true,
        component: NewBlogs,
        hideMenu: false,
        parentName: 'Home',
        keys: '2',
        auth: true
    },
    {
        name: 'Details',
        path: '/details/:id',
        exact: true,
        component: Details,
        hideMenu: false,
        parentName: 'Home',
        keys: '3',
        auth: false
    },

]

export const router = () => (
    <Switch>
        {
            routeData
                .map((item: routeItem, index: number) => (

                    localStorage.getItem('tokens')
                        ? <Route exact={item.exact} path={item.path} component={item.component} key={index} /> : (item.auth
                        ? <NotFound key={index} />
                        : <Route exact={item.exact} path={item.path} component={item.component} key={index} />)

                ))
        }
    </Switch>

)