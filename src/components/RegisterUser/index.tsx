import React, {Component} from 'react'
import {Checkbox, Form, Icon, Input, Modal, Radio, Button, Select} from "antd"
import {storeRegister} from '@/stores'
import {autorun} from "mobx"
import {Ajax} from "@/axios"


const {
    setShowRegister,
    getShowRegister
} = storeRegister

interface IProps {
    form: any
}

class RegisterUser extends Component<IProps> {

    state = {
        visible: false,
        confirmDirty: false
    }

    componentDidMount() {
        autorun(() => {
            this.setState({
                visible: getShowRegister.showRegister
            })
        })
    }

    handleOk() {
        const form = this.props.form
        form.validateFields((err: any, values: any) => {
            if (err) {
                return
            }
            Ajax.post(`/api/login/registerUser`, {
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
            setShowRegister({
                showRegister: this.state.visible
            })
        })
    }
    handleConfirmBlur = (e: any) => {
        const value = e.target.value
        this.setState({ confirmDirty: this.state.confirmDirty || !!value })
    }
    compareToFirstPassword = (rule:any, value:any, callback:any) => {
        const form = this.props.form
        if (value && value !== form.getFieldValue('password')) {
            // callback('两次密码不一致')
            callback()
        } else {
            callback()
        }
    }

    validateToNextPassword = (rule:any, value:any, callback:any) => {
        const form = this.props.form
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true })
        }
        callback()
    }

    render() {
        const {getFieldDecorator} = this.props.form
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        }
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{ width: 70 }}>
                <Select.Option value="86">+86</Select.Option>
                <Select.Option value="87">+87</Select.Option>
            </Select>
        )
        return (
            <Modal
                title="Login"
                visible={this.state.visible}
                onOk={() => this.handleOk()}
                onCancel={() => this.handleCancel()}
            >
                <Form layout="vertical">
                    <Form.Item
                        {...formItemLayout}
                        label="E-mail"
                    >
                        {getFieldDecorator('email', {
                            rules: [{
                                type: 'email', message: 'The input is not valid E-mail!',
                            }, {
                                required: true, message: 'Please input your E-mail!',
                            }],
                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label={'username'}
                    >
                        {getFieldDecorator('username', {
                            rules: [{required: true, message: 'Please input your username!'}],
                        })(
                            <Input prefix={
                                <Icon type="user" style={{color: 'rgba(0,0,0,.25)'}} />} placeholder="Username" />
                        )}
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Password"
                    >
                        {getFieldDecorator('password', {
                            rules: [{
                                required: true, message: 'Please input your password!',
                            }, {
                                validator: this.validateToNextPassword,
                            }],
                        })(
                            <Input type="password" />
                        )}
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Confirm Password"
                    >
                        {getFieldDecorator('confirm', {
                            rules: [{
                                required: true, message: 'Please confirm your password!',
                            }, {
                                validator: this.compareToFirstPassword,
                            }],
                        })(
                            <Input type="password" onBlur={this.handleConfirmBlur} />
                        )}
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Phone Number"
                    >
                        {getFieldDecorator('phone', {
                            rules: [{ required: true, message: 'Please input your phone number!' }],
                        })(
                            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

export default Form.create({})(RegisterUser)