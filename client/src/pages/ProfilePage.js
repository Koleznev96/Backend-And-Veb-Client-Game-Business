import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/authContext";
import {Loader} from "../components/Loader";
import {useMessage} from "../hooks/message.hook";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();
export const ProfilePage = () => {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
    const [profile, setProfile] = useState(null);
    const [name, setName] = useState(null);
    const [nickname, setNickname] = useState(null);
    const [email, setEmail] = useState(null);
    const [form, setForm] = useState({
        password: '', newPassword: '', repeatPassword: ''
    });

    const getLink = useCallback(async () => {
        try {
            const data = await request('/api/user/output_profile', 'POST', null, {
                Authorization: `${auth.token}`
            });
            setProfile(data);
            setName(data.profile.name);
            setNickname(data.profile.nickname);
            setEmail(data.email);
        } catch (e) {}
    }, [auth.token, request]);

    const notify = (messageText) => toast.info(messageText);

    useEffect(() => {
        getLink();
    }, [getLink]);

    useEffect( () => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    const changeNameHandler = event => {
        setName(event.target.value);
    }
    const changeNicknameHandler = event => {
        setNickname(event.target.value);
    }
    const changeEmailHandler = event => {
        setEmail(event.target.value);
    }
    const changePasswordHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    if (loading) {
        return <Loader />
    }

    const profileHandler = async () => {
        try {
            const data = await request('/api/user/change_profile', 'POST', {name, nickname, email}, {
                Authorization: `${auth.token}`
            });
            notify(data.message.toString());
        } catch (e) {}
    }



    const passwordHandler = async () => {
        try {
            const data = await request('/api/user/change_password', 'POST', {...form}, {
                Authorization: `${auth.token}`
            });
            notify(data.message.toString());
        } catch (e) {}
    }

    return (
        <div className="main__content-inner main__content-profile-inner">
            <div className="row justify-content-center justify-content-lg-start">
                <div className="main__content-profile-info">
                    <div className="main__content-profile-info-foto">
                        {/*../verstcka/img/icons/curcle-gray.svg*/}
                        <img src="" alt=""/>
                    </div>
                    <div className="main__content-profile-info-box">
                        <div className="main__content-profile-info-name">
                            <p>{ nickname }</p>
                            <span>Укажите основную информацию, чтобы пользоваться Restart было
                                                удобнее</span>
                        </div>
                    </div>
                </div>
                <div className="main__content-profile-dataForm">
                    <div className="row justify-content-center justify-content-lg-start">
                        <div className="profile-Form-input col-12 col-sm-6">
                            <label>Имя</label>
                            <input
                                type="text"
                                defaultValue={ name ? name : "" }
                                name="name"
                                onChange={changeNameHandler}
                            />
                        </div>
                        <div className="profile-Form-input col-12 col-sm-6">
                            <label>Никнейм</label>
                            <input
                                type="text"
                                defaultValue={ nickname ? nickname : "" }
                                name="nickname"
                                onChange={changeNicknameHandler}
                            />
                        </div>
                    </div>
                    <div className="row justify-content-center justify-content-lg-start">
                        <div className="profile-Form-input col-12 col-sm-6">
                            <label>Email</label>
                            <input
                                type="email"
                                value={ email ? email : "" }
                                disabled
                                name="email"
                                onChange={changeEmailHandler}
                            />
                        </div>
                        <div className="profile-Form-input profile-dataForm-rating col-12 col-sm-6">
                            <label>Место в общем рейтинге</label>
                            <input
                                type="text"
                                value={ profile ? profile.rating : "" }
                                disabled
                            />
                        </div>
                    </div>
                    <div className="profile-passForm-btn">
                        <button
                            onClick={profileHandler}
                            disabled={loading}
                        >Изменить данные</button>
                    </div>
                </div>
                <div className="main__content-profile-passForm">
                    <div className="main__content-profile-passForm-title">
                        <p>Изменить пароль</p>
                    </div>
                    <div className="profile-Form-input">
                        <label>Старый пароль:</label>
                        <input
                            id="password"
                            type="password"
                            name='password'
                            value={form.password}
                            onChange={changePasswordHandler}
                        />
                    </div>
                    <div className="profile-Form-input">
                        <label>Новый пароль:</label>
                        <input
                            id="newPassword"
                            type="password"
                            name='newPassword'
                            value={form.newPassword}
                            onChange={changePasswordHandler}
                        />
                    </div>
                    <div className="profile-Form-input">
                        <label>Новый пароль:</label>
                        <input
                            id="repeatPassword"
                            type="password"
                            name='repeatPassword'
                            value={form.repeatPassword}
                            onChange={changePasswordHandler}
                        />
                    </div>
                    <div className="profile-passForm-btn">
                        <button
                            onClick={passwordHandler}
                            disabled={loading}
                        >Изменить пароль</button>
                    </div>
                </div>
            </div>
        </div>
    );
};