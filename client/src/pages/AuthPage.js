import React, {useContext, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/authContext";

export const AuthPage = () => {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
    const [form, setForm] = useState({
        email: '', password: ''
    })

    useEffect( () => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    const registerHandler = async () => {
        try {
            const data = await  request('/api/auth/register', 'POST', {...form});
            auth.login(data.token);
        } catch (e) {}
    }

    const loginHandler = async () => {
        try {
            const data = await  request('/api/auth/login', 'POST', {...form});
            auth.login(data.token);
        } catch (e) {}
    }

    return (
        <div className="main__content-profile-dataForm">
            <div className="row justify-content-center justify-content-lg-start">
                <div className="profile-Form-input col-12 col-sm-6">
                    <label>Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={changeHandler}
                    />
                </div>
            </div>
            <div className="row justify-content-center justify-content-lg-start">
                <div className="profile-Form-input col-12 col-sm-6">
                    <label>Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={changeHandler}
                    />
                </div>
            </div>
            <br/>
            <button
                className="btn btn-primary"
                style={{marginRight: 10}}
                disabled={loading}
                onClick={loginHandler}
            >
                Войти
            </button>
            <button
                className="btn btn-primary"
                onClick={registerHandler}
                disabled={loading}
            >
                Регистрация
            </button>
        </div>
    );
};
