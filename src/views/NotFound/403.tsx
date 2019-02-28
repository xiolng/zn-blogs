import React from 'react'
import Exception from '@Components/Exception'

const Exception403 = () => (
    <Exception
        type={'403'}
        desc={403}
        linkElement={'a'}
        backText={'返回首页'}
        redirect={'/'}
    />
)

export default Exception403