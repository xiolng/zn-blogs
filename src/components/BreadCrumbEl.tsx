import React, {Component} from 'react'
import {Breadcrumb} from "antd"
import {BreadCrumbItem, storeBreadcrumb} from "@/stores"
import {autorun} from "mobx"

class BreadCrumbEl extends Component {
    state = {
        breadcrumbData: {
            parentName: '',
            name: '',
            keys: ''
        }
    }

    componentDidMount() {
        autorun(() => {
            this.setState({
                breadcrumbData: {...storeBreadcrumb.getBreadcrumb}
            })
        })
    }

    setBreadList(breadList: BreadCrumbItem) {
        console.log(Object.values(breadList))
        return Object.values(breadList)
            .filter((value: string) => String(+value) === 'NaN')
            .map((v: string, index: number) => (
                    <Breadcrumb.Item key={index}>{v}</Breadcrumb.Item>
                )
            )
    }

    render() {
        return (
            <Breadcrumb style={{margin: '16px 0'}}>
                {
                    this.setBreadList(this.state.breadcrumbData)
                }
            </Breadcrumb>
        )
    }
}

export default BreadCrumbEl