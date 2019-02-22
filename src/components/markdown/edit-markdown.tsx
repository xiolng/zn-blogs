import React, {PureComponent} from 'react'
import * as CodeMirror from "codemirror"
import 'codemirror/keymap/sublime'
import 'codemirror/mode/markdown/markdown'
import 'codemirror/addon/edit/closetag'
import 'codemirror/addon/search/search'
import 'codemirror/addon/search/jump-to-line'
import 'codemirror/addon/runmode/colorize'
import 'codemirror/addon/dialog/dialog.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/mdn-like.css'
import './style.scss'

interface IProps {
    values: string;
    onChange: any;
}

interface IState {
    details: string;
}

class EditMarkdown extends PureComponent<IProps, IState> {
    state = {
        details: ``
    }
    inputRef: any
    newCodeMirror: any

    constructor(props: any) {
        super(props)
        this.inputRef = React.createRef()
    }

    componentDidMount() {
        this.setState({
            details: this.props.values
        })
        this.newCodeMirror = CodeMirror.fromTextArea(this.inputRef.current, {
            value: this.state.details,
            lineNumbers: true,
            lineWrapping: true,
            mode: 'markdown', // 定义mode
            extraKeys: {"Ctrl": "autocomplete"}, // 自动提示配置
            theme: 'mdn-like',
            tabSize: 4,
            scrollbarStyle: 'null',
            showCursorWhenSelecting: true,
            cursorHeight: 0.85
        })
        this.newCodeMirror.on('inputRead', () => {
            this.setState({
                details: this.newCodeMirror.getValue()
            }, () => {
                this.props.onChange(this.newCodeMirror.getValue())
            })
        })
    }


    render() {
        return (
            <div
                onChange={this.props.onChange}
                style={{height: '100%'}}
            >
                <textarea
                    value={this.state.details}
                    ref={this.inputRef}
                    autoFocus={true}
                    onChange={(e: any) => {
                        this.setState({
                            details: e.target.value
                        })
                    }}
                />
            </div>
        )
    }
}

export default EditMarkdown