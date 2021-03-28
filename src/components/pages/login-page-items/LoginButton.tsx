import React from 'react';
import { Button, Icon } from 'semantic-ui-react'
import './LoginButton.module.scss'

const LoginButton = () => {
    return (
        <Button color='black'>
            <Icon name='spotify' color='green'/>
            Login
        </Button>
    );
};

export default LoginButton;