import React, {useCallback, useContext, useEffect, useState} from 'react';
import {AuthContext} from "../context/authContext";
import {useMessage} from "../hooks/message.hook";
import {useHttp} from "../hooks/http.hook";
import {Loader} from "../components/Loader";
import send from "./img/icons/send.svg";

export const ChatPage = () => {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
    const [messages, setMessages] = useState(null);
    const [form, setForm] = useState({
        text: ''
    });

    const textIdeasHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    const getLink = useCallback(async () => {
        try {
            const data = await request('/api/chat/output_messages', 'POST', null, {
                Authorization: `${auth.token}`
            });
            setMessages(data);
        } catch (e) {}
    }, [auth.token, request]);

    useEffect(() => {
        getLink();
    }, [getLink]);

    useEffect( () => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    if (loading) {
        return <Loader />
    }

    // Компонент UsersList
    function MessageList(props) {
        // для удобства записываем значение props.users в переменную users
        // используя метод map() и заполняем данными тег li
        const listItems = props.props.map((item, index ) =>
            <div key={index} className="main__content-chat-message">
                <div className="main__content-chat-message-name">
                    <p>
                        { item.author }
                    </p>
                </div>
                <div className="main__content-chat-message-text">
                    <p>
                        { item.text }
                    </p>
                </div>
                <div className="main__content-chat-message-time">
                    <p>
                        { item.date }
                    </p>
                </div>
            </div>
        );
        // Возвращаем список с именами пользователей
        return (
            <div className="main__content-chat-box-wrapper">
                { listItems }
            </div>
        );
    }

    const sendMessageHandler = async () => {
        try {
            const data = await request('/api/chat/creation_message', 'POST', {...form}, {
                Authorization: `${auth.token}`
            });
            setMessages(data);

        } catch (e) {}
    }

    return (
        <div className="main__content-inner">
            <div className="justify-content-center justify-content-lg-start">
                <div className="main__content-chat-box">
                    { messages && <MessageList props={messages} /> }
                    <div className="main__content-chat-entr">
                        <form>
                            <textarea
                                name="text"
                                id="text"
                                value={form.text}
                                onChange={textIdeasHandler}
                            />
                            <button
                                onClick={sendMessageHandler}
                                disabled={loading}
                            >
                                <img src={send} alt=""/>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};