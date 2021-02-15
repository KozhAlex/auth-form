import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../context/auth.context';
import moment from 'moment';

export const NotificationPage = () => {
    const auth = useContext(AuthContext);
    const {expiresIn} = auth;
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
    return (
        <div>
            <h1>Success Login Page</h1>
            {expTime && <p>{`Время действия токена закончится через: ${moment(expTime)
                .minute()} минут(ы) и ${moment(expTime)
                .second()} секунд(ы)`}</p>}
        </div>
    );
};
