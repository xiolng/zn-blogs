import React, {Component} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'

import Home from '@Views/home'
import Edit from '@Views/edit'
import NewBlogs from '@Views/newBlogs'
import Details from '@Views/details'

import NotFound from '@Views/NotFound'
import Exception403 from '@Views/NotFound/403'
import Exception500 from '@Views/NotFound/500'

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
        name: 'List',
        path: '/',
        exact: true,
        component: Home,
        hideMenu: false,
        parentName: 'Home',
        keys: '0',
        auth: false
    },
    {
        name: 'Edit',
        path: '/edit/:id',
        exact: true,
        component: Edit,
        hideMenu: true,
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
        hideMenu: true,
        parentName: 'Home',
        keys: '3',
        auth: false
    },
    {
        name: '404',
        path: '/404',
        exact: true,
        component: NotFound,
        hideMenu: true,
        parentName: 'Home',
        keys: '404',
        auth: false
    },
    {
        name: '403',
        path: '/403',
        exact: true,
        component: Exception403,
        hideMenu: true,
        parentName: 'Home',
        keys: '403',
        auth: false
    },
    {
        name: '500',
        path: '/500',
        exact: true,
        component: Exception500,
        hideMenu: true,
        parentName: 'Home',
        keys: '500',
        auth: false
    },

]
export const routeMenu = routeData.filter((v:routeItem) => !v.hideMenu)

export const router = () => (
    <Switch>
        {
            routeData
                .filter((item: routeItem) => (localStorage.getItem('tokens') && item) || (!localStorage.getItem('tokens') && !item.auth))
                .map((item: routeItem, index: number) => (
                    <Route exact={item.exact} path={item.path} component={item.component} key={index} />
                ))
        }
        {
            <Redirect to={'/404'} />
        }
    </Switch>

)