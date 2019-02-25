import React, {Component} from 'react'
import {Col, Layout, Row} from 'antd'
import BreadCrumbEl from '@Components/BreadCrumbEl'
import MenuList from '@Components/MenuList'
import UserBox from '@Components/UserBox'
import './App.css'

class App extends Component {

    render() {
        return (
            <Layout className="layout">
                <Layout.Header style={{backgroundColor: '#fff'}}>
                    <Row type={'flex'} justify={'space-between'}>
                        <Col
                            sm={{span: 20}}
                            lg={{span: 18}}
                        >
                            <div className="logo" />
                            <MenuList></MenuList>
                        </Col>
                        <Col>
                            <UserBox></UserBox>
                        </Col>
                    </Row>
                </Layout.Header>
                <Layout.Content style={{padding: '0 50px'}}>
                    <BreadCrumbEl></BreadCrumbEl>
                    <div style={{background: '#fff', padding: 24, minHeight: 280}}>
                        {this.props.children}
                    </div>
                </Layout.Content>
                <Layout.Footer style={{textAlign: 'center'}}>
                    znzheng ©2019 Created by znzheng
                </Layout.Footer>
            </Layout>
        )
    }
}

export default App
