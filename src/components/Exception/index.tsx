import React, { createElement } from 'react'
import classNames from 'classnames'
import { Button } from 'antd'
import config from './typeConfig'
import styles from './index.module.scss'

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

    render() {
        const {
            className,
            backText,
            linkElement = 'a',
            type = '403',
            title,
            desc,
            img,
            actions,
            redirect = '/',
            ...rest
        } = this.props
        console.log(this.props)
        const pageType = type in config ? type : '404'
        const clsString = classNames(styles.exception, className)
        return (
            <div className={clsString} {...rest}>
                <div className={styles.imgBlock}>
                    <div
                        className={styles.imgEle}
                        style={{ backgroundImage: `url(${img || config[pageType].img})` }}
                    />
                </div>
                <div className={styles.content}>
                    <h1>{title || config[pageType].title}</h1>
                    <div className={styles.desc}>{desc || config[pageType].desc}</div>
                    <div className={styles.actions}>
                        {/* {actions || */}
                        {/* createElement( */}
                            {/* linkElement, */}
                            {/* { */}
                                {/* to: { */}
                                    {/* path: redirect */}
                                {/* }, */}
                                {/* href: redirect, */}
                            {/* }, */}
                            {/* <Button type="primary">{backText}</Button> */}
                        {/* )} */}
                    </div>
                </div>
            </div>
        )
    }
}

export default Exception
