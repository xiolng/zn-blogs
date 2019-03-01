import React from 'react'
import Exception from '@Components/Exception'

const Exception500 = () => (
    <Exception
        type="500"
        backText={'返回首页'}
        redirect={'/'}
    />
)

export default Exception500