import React, {Component} from 'react'
import {Breadcrumb, Layout, Menu} from 'antd'
import './App.css'

class App extends Component {

    componentDidMount(){
        console.log(this.props)
    }
    render() {
        return (
            <Layout className="layout">
                <Layout.Header style={{backgroundColor: '#fff'}}>
                    <div className="logo" />
                    <Menu
                        mode="horizontal"
                        defaultSelectedKeys={['1']}
                        style={{lineHeight: '64px'}}
                    >
                        <Menu.Item key="1">nav 1</Menu.Item>
                    </Menu>
                </Layout.Header>
                <Layout.Content style={{padding: '0 50px'}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{background: '#fff', padding: 24, minHeight: 280}}>
                        {this.props.children}
                    </div>
                </Layout.Content>
                <Layout.Footer style={{textAlign: 'center'}}>
                    Ant Design ©2018 Created by Ant UED
                </Layout.Footer>
            </Layout>
        )
    }
}

export default App
