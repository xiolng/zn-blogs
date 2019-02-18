import React, {PureComponent} from 'react'
import * as hljs from 'highlight.js'

import 'highlight.js/styles/dark.css'

interface IProps {
    value: string;
    language: string;
}

interface IState {
    codeEl: string;
}

class CodeBlock extends PureComponent<IProps, IState> {

    state = {
        codeEl: ''
    }

    setRef(el: any) {
        this.setState({
            codeEl: el
        }, () => {
            this.highlightCode()
        })
    }

    highlightCode() {
        hljs.highlightBlock(this.state.codeEl)
    }

    render() {
        return (
            <pre>
        <code ref={el => this.setRef(el)} className={`language-${this.props.language}`}>
          {this.props.value}
        </code>
      </pre>
        )
    }
}

export default CodeBlock