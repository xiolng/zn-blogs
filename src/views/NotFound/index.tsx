import React from 'react'
import Exception from '@Components/Exception'

const NotFound = () => (
    <Exception
        type="404"
        backText={'返回首页'}
        redirect={'/'}
    />
)

export default NotFound