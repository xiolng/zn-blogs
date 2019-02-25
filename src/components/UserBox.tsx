import React, {Component} from 'react'
import {Avatar, Button} from 'antd'


const UserList = ['U', 'Lucy', 'Tom', 'Edward']
const colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae']

interface IProps {

}

interface IState {
    user: string,
    color: string
}

class UserBox extends Component<IProps, IState> {

    state = {
        user: UserList[0],
        color: colorList[0],
    }

    changeUser() {
        const index = UserList.indexOf(this.state.user)
        this.setState({
            user: index < UserList.length - 1 ? UserList[index + 1] : UserList[0],
            color: index < colorList.length - 1 ? colorList[index + 1] : colorList[0],
        })
    }

    render() {
        return (
            <div onClick={() => this.changeUser()}>
                <Avatar style={{backgroundColor: this.state.color, verticalAlign: 'middle'}} size="large">
                    {this.state.user}
                </Avatar>
                <span style={{marginLeft: 10, fontSize: 16}}>znzheng</span>
            </div>
        )
    }
}

export default UserBox