import React, {Component} from 'react'
import ReactMarkdown from 'react-markdown'
import {Col, Input, Row} from "antd"
import CodeBlock from '../../components/code-block'
import * as CodeMirror from 'codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/darcula.css'
import './style.scss'


const initTxt = `
# Live demo

Changes are automatically rendered as you type.

* Implements [GitHub Flavored Markdown](https://github.github.com/gfm/)
* Renders actual, "native" React DOM elements
* Allows you to escape or skip HTML (try toggling the checkboxes above)
* If you escape or skip the HTML, no \`dangerouslySetInnerHTML\` is used! Yay!

## HTML block below

<blockquote>
  This blockquote will change based on the HTML settings above.
</blockquote>

## How about some code?
\`\`\`markdown
var React = require('react');
var Markdown = require('react-markdown');

React.render(
  <Markdown source="# Your markdown here" />,
  document.getElementById('content')
);
\`\`\`

Pretty neat, eh?

## Tables?

| Feature   | Support |
| --------- | ------- |
| tables    | ✔ |
| alignment | ✔ |
| wewt      | ✔ |

## More info?

Read usage information and more on [GitHub](//github.com/rexxars/react-markdown)

---------------

A component by [Espen Hovlandsdal](https://espen.codes/)
`

class Edit extends Component {
    state = {
        markdownSrc: initTxt
    }
    private inputRef: any

    constructor(props: any) {
        super(props)
        this.inputRef = React.createRef()
    }

    componentDidMount() {
        CodeMirror.fromTextArea(this.inputRef.current, {
            value: this.state.markdownSrc,
            lineNumbers: true,
            mode: 'markdown',
            theme: 'darcula',
            tabSize: 4,
            scrollbarStyle: 'null',
            showCursorWhenSelecting: true,
        });
    }

    render() {
        return (
            <Row gutter={20}>
                <Col span={14}>
                    <textarea
                        value={this.state.markdownSrc}
                        ref={this.inputRef}
                        autoFocus={true}
                        onChange={e => {
                            this.setState({
                                markdownSrc: e.target.value
                            })
                        }}
                        style={{
                            background: '#444',
                            color: '#fff'
                        }}
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