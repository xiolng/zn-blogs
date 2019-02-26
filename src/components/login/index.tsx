import React, {Component} from 'react'
import {Checkbox, Form, Icon, Input, Modal, Radio, Button} from "antd"
import {storeLogin} from '@/stores'
import {autorun} from "mobx"
import {Ajax} from "@/axios"


const {
    setShowLogin,
    getShowLogin
} = storeLogin

interface IProps {
    form: any
}

class Login extends Component<IProps> {

    state = {
        visible: false
    }

    componentDidMount() {
        autorun(() => {
            this.setState({
                visible: getShowLogin.showLogin
            })
        })
    }

    handleOk() {
        const form = this.props.form
        form.validateFields((err: any, values: any) => {
            if (err) {
                return
            }
            Ajax.post(`/api/login/getToken`, {
                data: values
            }).then((res: any) => {
                if (res.data.token) {
                    localStorage.setItem('tokens', `znzheng ${res.data.token}`)
                }
            })
            console.log('Received values of form: ', values)
            form.resetFields()
            this.closeModal()
        })
    }

    handleCancel() {
        this.props.form.resetFields()
        this.closeModal()
    }

    closeModal() {
        this.setState({
            visible: false
        }, () => {
            setShowLogin({
                showLogin: this.state.visible
            })
        })
    }

    render() {
        const {getFieldDecorator} = this.props.form
        return (
            <Modal
                title="Login"
                visible={this.state.visible}
                onOk={() => this.handleOk()}
                onCancel={() => this.handleCancel()}
                width={300}
            >
                <Form layout="vertical">
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{required: true, message: 'Please input your username!'}],
                        })(
                            <Input prefix={
                                <Icon type="user" style={{color: 'rgba(0,0,0,.25)'}} />} placeholder="Username" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{required: true, message: 'Please input your Password!'}],
                        })(
                            <Input prefix={
                                <Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}} />} type="password" placeholder="Password" />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox>Remember me</Checkbox>
                        )}
                        <a className="login-form-forgot" href="" style={{marginLeft: 20}}>Forgot password</a>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

export default Form.create({})(Login)