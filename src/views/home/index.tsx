import React, {Component} from 'react'
import {Avatar, Icon, List} from "antd"
import CodeBlock from "@Components/code-block";
import ReactMarkdown from "react-markdown";


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
        let list = JSON.parse(localStorage.getItem('listData') || '[]')
        // for (let i = 0; i < 23; i++) {
        //     list.push({
        //         href: '/edit/' + i,
        //         title: `ant design part ${i}`,
        //         avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        //         description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        //         content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
        //     });
        // }
        let data = list.map((v: any) => {
            let arrCon = v.content.split('')
            arrCon.length = 10
            v.content = arrCon.join(',').replace(/,/g, '')
            return v
        })
        this.setState({
            listData: data
        }, () => {
            console.log(this.state.listData)
        })
    }

    render() {
        return (
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: (page) => {
                        console.log(page);
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
                                <IconText type="like-o" text="156" />,
                                <IconText type="message" text="2" />
                            ]
                        }
                        extra={
                            <img
                                width={272}
                                alt="logo"
                                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                            />}
                    >
                        <List.Item.Meta
                            avatar={
                                <Avatar src={item.avatar} />
                            }
                            title={
                                <a href={item.href}>
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