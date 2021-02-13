import React, {useContext, useEffect, useState} from 'react';
import {useHttp} from '../hooks/http.hook';
import {useMessage} from '../hooks/message.hook';
import {AuthContext} from '../context/auth.context';
import {useFormFields} from '../hooks/useFormFields';
import styled from 'styled-components';
import {emailValidation, passwordValidation} from '../utils/validationRules';


const Card = styled.div`
  box-sizing: border-box;
  max-width: 450px;
  margin: 65px auto 0;
  background-color: #2A2C35;
  border-radius: 12px;
  padding: 20px 40px;
`;
const CardHeader = styled.h1`
  font-size: 36px;
  text-align: center;
  color: #CFD2E3;
`;

const Row = styled.div`
  margin: 15px 0`;
const Label = styled.label`
  display: block;
  font-size: 14px;
  color: #CFD2E3;
  margin-bottom: 5px
`;
const Input = styled.input`
  background-color: #1E1F27;
  height: 40px;
  width: 300px;
  color: #CFD2E3;
  border: 1px solid #1E1F27;

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0 30px #1E1F27 inset !important;
    -webkit-text-fill-color: #CFD2E3;
  }
`;

const Error = styled.span`
  display: block;
  color: #FF7549
`;

const Button = styled.button`
  background-color: #855AFF;
  border-radius: 4px;
  font-weight: 600;
  text-align: center;
  font-size: 14px;
  color: #FFF;
  border: 0;
  height: 40px;
  width: 300px;
  &:disabled {
    background-color: #85AAFF;
  }
  &:hover {
    cursor: pointer;
  }
`;

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

    const registerHandler = async (values) => {
        try {
            const data = await request('/api/auth/register', 'POST', {...values.values.values});
            message(data.message);
        } catch (e) {

        }
    };

    const loginHandler = async (values) => {
        try {
            const data = await request('/api/auth/login', 'POST', {...values.values.values});
            auth.login(data.token, data.userId);
        } catch (e) {
        }
    };

    // return (
    //     <div className="row">
    //         <div className="col s6 offset-s3">
    //             <h1>Auth Form</h1>
    //             <div className="card blue darken-1">
    //                 <div className="card-content white-text">
    //                     <span className="card-title">Авторизация</span>
    //                     <div>
    //                         <div className="input-field">
    //                             <input
    //                                 placeholder="Введите email"
    //                                 id="email"
    //                                 type="text"
    //                                 name="email"
    //                                 className="yellow-input"
    //                                 onChange={changeHandler}
    //                             />
    //                             <label htmlFor="email">Email</label>
    //                         </div>
    //
    //                         <div className="input-field">
    //                             <input
    //                                 placeholder="Введите пароль"
    //                                 id="password"
    //                                 type="password"
    //                                 name="password"
    //                                 className="yellow-input"
    //                                 onChange={changeHandler}
    //                             />
    //                             <label htmlFor="password">Пароль</label>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <div className="card-action">
    //                     <button
    //                         className="btn yellow darken-4"
    //                         style={{marginRight: 10}}
    //                         disabled={loading}
    //                         onClick={loginHandler}
    //                     >
    //                         Войти
    //                     </button>
    //                     <button
    //                         className="btn grey lighten-1 black-text"
    //                         onClick={registerHandler}
    //                         disabled={loading}
    //                     >
    //                         Регистрация
    //                     </button>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // );
    return (
        <Card>
            <CardHeader>Регистрация</CardHeader>
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
