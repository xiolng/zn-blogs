import React, {createElement} from 'react'
import classNames from 'classnames'
import {Button} from 'antd'
import config from './typeConfig'
import {storeBreadcrumb} from '@/stores'
import styles from './index.module.scss'

const {
    setBreadcrumb
} = storeBreadcrumb

export interface IExceptionProps {
    type?: '403' | '404' | '500';
    title?: React.ReactNode;
    desc?: React.ReactNode;
    img?: string;
    actions?: React.ReactNode;
    linkElement?: string | React.ComponentType;
    style?: React.CSSProperties;
    className?: string;
    backText?: React.ReactNode;
    redirect?: string;
}

class Exception extends React.PureComponent<IExceptionProps, any> {
    static defaultProps = {
        backText: 'back to home',
        redirect: '/',
    }

    constructor(props: IExceptionProps) {
        super(props)
        this.state = {}
    }
    goIndex() {
        setBreadcrumb({
            parentName: 'Home',
            name: 'list',
            keys: '0'
        })
    }

    render() {
        const {
            className,
            backText,
            type = '403',
            title,
            desc,
            img,
            redirect,
            ...rest
        } = this.props
        const pageType = type in config ? type : '404'
        const clsString = classNames(styles.exception, className)
        return (
            <div className={clsString} {...rest}>
                <div className={styles.imgBlock}>
                    <div
                        className={styles.imgEle}
                        style={{backgroundImage: `url(${img || config[pageType].img})`}}
                    />
                </div>
                <div className={styles.content}>
                    <h1>{title || config[pageType].title}</h1>
                    <div className={styles.desc}>{desc || config[pageType].desc}</div>
                    <div className={styles.actions}>
                        <Button href={redirect} type={'primary'} onClick={() => this.goIndex()}>{backText}</Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Exception
