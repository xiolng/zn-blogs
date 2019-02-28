import React, {Component} from 'react'
import {routeData, routeItem} from "@/router"
import {Menu} from "antd"
import {Link} from "react-router-dom"
import {storeBreadcrumb} from "@/stores"
import {BreadCrumbItem} from '@/stores/StoreBreadcrumb'
import {autorun} from 'mobx'

const {
    getBreadcrumb,
    setBreadcrumb
} = storeBreadcrumb

class MenuList extends Component {


    state = {
        breadcrumb: {
            parentName: '',
            name: '',
            keys: ''
        }
    }

    componentDidMount() {
        autorun(() => {
            let data: BreadCrumbItem = getBreadcrumb
            this.setState({
                breadcrumb: {...data}
            })
        })
    }

    setNav(breadCrumb: routeItem): void {
        const {
            parentName,
            name,
            keys
        } = breadCrumb
        setBreadcrumb({parentName, name, keys})
    }

    render() {
        return (
            <Menu
                mode="horizontal"
                selectedKeys={[this.state.breadcrumb.keys]}
                style={{lineHeight: '64px'}}
                onClick={({item, key, keyPath}) => {
                    let value = routeData[+key]
                    this.setNav(value)
                }}
            >
                {
                    routeData
                    // .filter((v) => {
                    //     let token = localStorage.getItem('tokens')
                    //     return token ? v : !v.auth
                    // })
                        .map((v: routeItem, index: number) => (
                            <Menu.Item key={index}>
                                <Link to={v.path}>{v.name}</Link>
                            </Menu.Item>
                        ))
                }
            </Menu>
        )
    }
}

export default MenuList