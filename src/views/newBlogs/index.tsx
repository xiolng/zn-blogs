import React, {Component} from 'react'
import ReactMarkdown from 'react-markdown'
import {Button, Cascader, Col, Form, Input, Row, Select} from "antd"
import {FormComponentProps} from 'antd/lib/form'
import CodeBlock from '@Components/code-block'
import EditMarkdown from '@Components/markdown/edit-markdown'
import {Ajax} from '@/axios/index.ts'
import './style.scss'


interface IProps extends FormComponentProps {
    content: string
}

class NewBlogs extends Component<IProps> {
    state = {
        content: ``,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
    }

    handleOnChange(values: any) {
        this.setState({
            content: values
        })
        this.props.form.setFieldsValue({
            content: values
        })
    }

    handleOnSubmit(e: any) {

        e.preventDefault()
        this.props.form.validateFields((err: any, fieldsValue: any) => {
            if (err) {
                return
            }
            let list = JSON.parse(localStorage.getItem('listData') || '[]')
            list.push({...this.state, ...fieldsValue})
            localStorage.setItem('listData', JSON.stringify(list))
            Ajax.post('/api/blogs/createBlogs', {
                ...this.state,
                ...fieldsValue
            }).then((res: any) => {
                console.log(res)
            })
        })
    }

    getClassify() {
        return [
            {
                value: 'qianduan',
                label: '前端',
                children: [
                    {
                        value: 'kuangjia',
                        label: '框架',
                        children: [
                            {
                                value: 'react',
                                label: 'react',
                            },
                            {
                                value: 'vue',
                                label: 'vue',
                            }
                        ],
                    }
                ],
            },
            {
                value: 'houduan',
                label: '后端',
                children: [
                    {
                        value: 'kuangjia',
                        label: '框架',
                        children: [
                            {
                                value: 'php',
                                label: 'php',
                            },
                            {
                                value: 'python',
                                label: 'python'
                            }
                        ],
                    }
                ],
            }
        ]
    }

    render() {

        const {getFieldDecorator} = this.props.form
        const formItemLayout = {
            labelCol: {
                span: 3
            },
            wrapperCol: {
                span: 21
            },
        }

        const cascaderOnChange = (value: any, selectedOptions: any) => {
            console.log(value, selectedOptions)
        }
        const filter = (inputValue: any, path: any): boolean => {
            return (path.some((option: any) => (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1))
        }
        return (
            <div>
                <Form layout={'horizontal'} onSubmit={(e: any) => this.handleOnSubmit(e)}>
                    <Form.Item
                        label={'文章名称'}
                        {...formItemLayout}
                    >
                        {getFieldDecorator('title', {
                            rules: [{
                                required: true, message: '请输入文章名称'
                            }]
                        })(
                            <Input style={{maxWidth: '260px', margin: '0 5px'}} placeholder="" />
                        )}
                    </Form.Item>
                    <Form.Item
                        label={'分类'}
                        {...formItemLayout}
                    >
                        {getFieldDecorator('cascaderName', {
                            rules: [{
                                required: true, message: '请输入或选择类别'
                            }]
                        })(
                            <Cascader
                                options={this.getClassify()}
                                onChange={cascaderOnChange}
                                placeholder="请输入或选择类别"
                                showSearch={{filter}}
                                style={{maxWidth: '260px'}}
                            />
                        )}
                    </Form.Item>
                    <Form.Item
                        label={'描述'}
                        {...formItemLayout}
                    >
                        {getFieldDecorator('description', {
                            rules: []
                        })(
                            <Input.TextArea
                                autosize={{minRows: 3, maxRows: 6}}
                                style={{maxWidth: '260px'}}
                            />
                        )}
                    </Form.Item>
                    <Form.Item label={'markDown编写'}>
                        {getFieldDecorator('content', {
                            rules: [{
                                required: true, message: '请输入markdown'
                            }]
                        })(
                            <Input style={{display: 'none'}} />
                        )}
                        <Row gutter={20} type={'flex'}>
                            <Col span={14}>
                                <EditMarkdown
                                    values={this.state.content}
                                    onChange={(value: any) => this.handleOnChange(value)}
                                />
                            </Col>
                            <Col span={10}>
                                <ReactMarkdown
                                    className={"result"}
                                    source={this.state.content}
                                    skipHtml={false}
                                    escapeHtml={false}
                                    renderers={{code: CodeBlock}}
                                />
                            </Col>
                        </Row>
                    </Form.Item>
                    <Form.Item className="Item">
                        <Button type={'primary'} htmlType={'submit'}>Submit</Button>
                    </Form.Item>
                </Form>

            </div>
        )
    }
}

export default Form.create()(NewBlogs)