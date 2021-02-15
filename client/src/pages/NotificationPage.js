import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../context/auth.context';
import moment from 'moment';
import {Button} from '../components/Button';
import {Card} from '../components/Card';
import {CardHeader} from '../components/CardHeader';
import {Row} from '../components/Row';
import {Label} from '../components/Label';
import {Loader} from '../components/Loader';

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
        <Card>
            {expTime ? (
                <>
                    <CardHeader>Success Login Page</CardHeader>
                    <Row align="center">
                        <Label>{`Время действия токена закончится через: ${moment(expTime)
                            .format('mm:ss')}`}</Label>
                    </Row>
                    <Row>
                        <Button onClick={logout}>Logout</Button>
                    </Row>
                </>) : (
                <Loader/>
            )
            }
        </Card>
    );
    }
;
