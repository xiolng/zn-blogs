import React, {Component} from 'react'
import {Avatar, Icon, List} from "antd"
import CodeBlock from "@Components/code-block"
import ReactMarkdown from "react-markdown"
import {Ajax} from "@/axios"


interface IProps {
    type: string,
    text: string
}

class IconText extends Component<IProps> {
    render() {
        return (
            <span>
                <Icon type={this.props.type} style={{marginRight: 8}} />
                {this.props.text}
            </span>
        )
    }
}

class Home extends Component {
    state = {
        listData: []
    }

    componentDidMount() {
        this.getList()
    }

    getList() {
        Ajax.post(`/api/blogs/blogsList`).then((res: any) => {
            this.setState({
                listData: res.data
            })
        })
    }

    render() {
        return (
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: (page) => {
                        console.log(page)
                    },
                    pageSize: 3,
                }}
                dataSource={this.state.listData}
                renderItem={(item: any) => (
                    <List.Item
                        key={item.title}
                        actions={
                            [
                                <IconText type="star-o" text="156" />,
                                <IconText type={'calendar'} text={'2011-01-01'} />
                            ]
                        }
                        extra={
                            <img
                                style={{
                                    maxWidth: 272,
                                    width: '100%'
                                }}
                                alt="logo"
                                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                            />}
                    >
                        <List.Item.Meta
                            avatar={
                                <Avatar src={item.avatar} />
                            }
                            title={
                                <a href={`/details/${item.id}`}>
                                    {item.title}
                                </a>
                            }
                            description={item.description}
                        />
                        <div style={{maxHeight: '50px', overflow: 'hidden'}}>
                            <ReactMarkdown
                                className={"result"}
                                source={item.content}
                                skipHtml={false}
                                escapeHtml={false}
                                renderers={{code: CodeBlock}}
                            />
                        </div>
                    </List.Item>
                )}
            />
        )
    }
}

export default Home