import React, { useContext, useEffect } from 'react';
import { Button, Icon } from 'semantic-ui-react'
import { ACTIONS, REQUEST_STRING } from '../../service/constants';
import { AppContext } from '../../service/context';

import './LoginButton.module.scss'

const LoginButton: React.FC = () => {

    const { state, dispatch } = useContext(AppContext);

    useEffect(() => {
        return () => {
            console.log("Unmounted login button")
        }
    }, []) 

    return (
        <a href={REQUEST_STRING}>
            <Button onClick={() => dispatch({ type: ACTIONS.SET_THEME, payload: "black"})} color='black'>
                <Icon name='spotify' color='green'/>
                Login
            </Button>
        </a>
        
    );
};

export default LoginButton;