import React, {Component} from 'react'
import {Ajax} from "@/axios"
import CodeBlock from "@Components/code-block"
import ReactMarkdown from "react-markdown"


interface IProps {
    match?: any,
    id: number;
}


interface IState {
    details: any;
}

class Details extends Component<IProps, IState> {


    state = {
        details: {
            content: ''
        }
    }

    componentDidMount() {
        console.log(this.props)
        this.getData()
    }

    getData() {
        console.log(111)
        Ajax.post(`/api/blogs/blogsDetail`, {
            data: {
                id: +this.props.match.params.id
            }
        }).then((res: any) => {
            this.setState({
                details: res.data
            })
        })
    }

    render() {
        return (
            this.state.details
                ? <ReactMarkdown
                    className={"result"}
                    source={this.state.details.content}
                    skipHtml={false}
                    escapeHtml={false}
                    renderers={{code: CodeBlock}}
                /> : <div>details</div>
        )
    }
}

export default Details