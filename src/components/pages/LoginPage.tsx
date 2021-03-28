import React from 'react';
import LoginButton from './login-page-items/LoginButton'
import s from './LoginPage.module.scss'
const LoginPage = () => {
    return (
        <div className={s.wrap}>
            <LoginButton/>
        </div>
    );
};

export default LoginPage;