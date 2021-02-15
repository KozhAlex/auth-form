import React, {useContext, useEffect} from 'react';
import {useHttp} from '../hooks/http.hook';
import {useMessage} from '../hooks/message.hook';
import {AuthContext} from '../context/auth.context';
import {useFormFields} from '../hooks/useFormFields';
import {emailValidation, passwordValidation} from '../utils/validationRules';
import {Card} from '../components/Card';
import {CardHeader} from '../components/CardHeader';
import {Row} from '../components/Row';
import {Label} from '../components/Label';
import {Input} from '../components/Input';
import {Error} from '../components/Error';
import {Button} from '../components/Button';

export const validate = {
    email: emailValidation,
    password: passwordValidation
};

const initialValues = {
    email: '',
    password: ''
};

export const AuthPage = () => {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {
        loading,
        httpError,
        request,
        clearHttpError
    } = useHttp();

    const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit
    } = useFormFields({
        initialValues,
        onSubmit: (values) => loginHandler({values}),
        validate
    });

    useEffect(() => {
        message(httpError);
        clearHttpError();
    }, [httpError, message, clearHttpError]);

    // const registerHandler = async (values) => {
    //     try {
    //         const data = await request('/api/auth/register', 'POST', {...values.values.values});
    //         message(data.message);
    //     } catch (e) {
    //
    //     }
    // };

    const loginHandler = async (values) => {
        try {
            const data = await request('/api/auth/login', 'POST', {...values.values.values});
            auth.login(data.token, data.userId);
        } catch (e) {
        }
    };

    return (
        <Card>
            <CardHeader>Авторизация</CardHeader>
            <form onSubmit={handleSubmit}>
                <Row>
                    <Label htmlFor='email'>Email</Label>
                    <Input type='email' id='email' name='email' value={values.email} onChange={handleChange}
                           onBlur={handleBlur} required/>
                    <Error>{touched.email && errors.email}</Error>
                </Row>
                <Row>
                    <Label htmlFor='password'>Password</Label>
                    <Input type='password' id='password' name='password' value={values.password}
                           onChange={handleChange} onBlur={handleBlur} required/>
                    <Error>{touched.password && errors.password}</Error>
                </Row>
                <Button type="submit" disabled={loading}>Sign in</Button>
            </form>
        </Card>
    );
};
