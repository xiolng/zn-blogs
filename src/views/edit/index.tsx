import React, {Component} from 'react'
import ReactMarkdown from 'react-markdown'
import {Col, Row} from "antd"
import CodeBlock from '@Components/code-block'
import EditMarkdown from '@Components/markdown/edit-markdown'
import './style.scss'




interface IState {
    markdownSrc: string;
}

class Edit extends Component<IState> {
    state = {
        markdownSrc: ``
    }

    handleOnChange(values: any) {
        this.setState({
            markdownSrc: values
        })
    }

    render() {
        return (
            <Row gutter={20}>
                <Col span={14}>
                    <EditMarkdown
                        values={this.state.markdownSrc}
                        onChange={(value: any) => this.handleOnChange(value)}
                    />
                </Col>
                <Col span={10}>
                    <ReactMarkdown
                        className={"result"}
                        source={this.state.markdownSrc}
                        skipHtml={false}
                        escapeHtml={false}
                        renderers={{code: CodeBlock}}
                    />
                </Col>
            </Row>
        )
    }
}

export default Edit