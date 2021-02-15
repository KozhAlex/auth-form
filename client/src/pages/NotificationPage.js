import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../context/auth.context';
import moment from 'moment';
import {Button} from '../components/Button';

export const NotificationPage = () => {
    const auth = useContext(AuthContext);
    const {
        expiresIn,
        logout
    } = auth;
    const [expTime, setExpTime] = useState(expiresIn);

    useEffect(() => {
        setExpTime(expiresIn);
    }, [expiresIn]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (expTime > 0) {
                setExpTime(expTime => expTime - 1000);
            }
        }, 1000);
        return () => clearInterval(interval);
    });
    useEffect(() => {
        if (expTime && expTime <= 0) {
            logout();
        }
    }, [expTime]);
    return (
        <div>
            <h1>Success Login Page</h1>
            {expTime && <p>{`Время действия токена закончится через: ${moment(expTime)
                .format('mm:ss')}`}</p>}
            <Button onClick={logout}>Logout</Button>
        </div>
    );
};
