import React, {Component} from 'react'
import {Avatar, Button} from 'antd'
import {storeLogin, storeRegister} from '@/stores'
import {autorun} from "mobx"


const {
    setShowLogin,
    getShowLogin
} = storeLogin
const {
    setShowRegister
} = storeRegister
const UserList = ['U', 'Lucy', 'Tom', 'Edward']
const colorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae']

interface IProps {

}

interface IState {
    user: string,
    color: string,
    showLogin: boolean
}

class UserBox extends Component<IProps, IState> {

    state = {
        user: '',
        color: colorList[Math.floor(Math.random() * 3)],
        showLogin: false
    }

    componentDidMount() {
        autorun(() => {
            this.setState({
                showLogin: getShowLogin.showLogin
            })
        })
    }

    setLogin() {
        this.setState({
            showLogin: true
        }, () => {
            setShowLogin({
                showLogin: this.state.showLogin
            })
            setShowRegister({
                showRegister: !this.state.showLogin
            })
        })
    }
    setRegister() {
        this.setState({
            showLogin: true
        }, () => {
            setShowLogin({
                showLogin: !this.state.showLogin
            })
            setShowRegister({
                showRegister: this.state.showLogin
            })
        })
    }

    render() {
        return (
            <div>
                {
                    this.state.user ? <div>
                        <Avatar style={{backgroundColor: this.state.color, verticalAlign: 'middle'}} size="large">
                            {this.state.user}
                        </Avatar>
                        <span style={{marginLeft: 10, fontSize: 16}}>znzheng</span>
                    </div> : <div>
                        <Button type={'primary'} onClick={() => this.setLogin()} style={{marginRight: 20}}>登录</Button>
                        <Button type={'primary'} onClick={() => this.setRegister()}>注册</Button>
                    </div>
                }
            </div>
        )
    }
}

export default UserBox