import React, {useCallback, useContext, useEffect, useState} from 'react';
import send from './img/icons/send.svg'
import {Loader} from "../components/Loader";
import {AuthContext} from "../context/authContext";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";

export const IdeasPage = () => {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
    const [ideas, setIdeas] = useState(null);
    const [form, setForm] = useState({
        text: ''
    });

    const textIdeasHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    const getLink = useCallback(async () => {
        try {
            const data = await request('/api/ideas/output_ideas', 'POST', null, {
                Authorization: `${auth.token}`
            });
            setIdeas(data);
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
    function IdeasList(props) {
        // для удобства записываем значение props.users в переменную users
        // используя метод map() и заполняем данными тег li
        const listItems = props.props.map((item, index ) =>
            <div key={ index.toString() } className="main__content-chat-message main__content-idea-message">
                <div className="main__content-chat-message-name">
                    <p>{ item.author }</p>
                </div>
                <div className="main__content-chat-message-text main__content-idea-message-text">
                    <p>{ item.text }</p>
                    {/*<p>Ghtlkfuf. blt. yjde.? njg жмите лайк, дожмем.....</p>*/}
                </div>
                <div className="main__content-idea-like">
                    <p>{ item.likes }</p>
                </div>
            </div>
        );
        // Возвращаем список с именами пользователей
        return (
            <ul> { listItems } </ul>
        );
    }

    const sendIdeaHandler = async () => {
        try {
            const data = await request('/api/ideas/creation_ideas', 'POST', {...form}, {
                Authorization: `${auth.token}`
            });
            setIdeas(data);

        } catch (e) {}
    }

    return (
        <div className="main__content-inner main__content-idea-inner">
            <div className="justify-content-center justify-content-lg-start">
                <div className="main__content-idea-offer">
                    <p>Поделитесь своей идеей, как нам можно улучшить наш сервис</p>
                    <p>Или раскажите о багах которые вы обнаружили</p>
                </div>
                <div className="main__content-chat-box main__content-idea-box">
                    <div className="main__content-chat-box-wrapper main__content-idea-box-wrapper">
                        { ideas && <IdeasList props={ideas} /> }
                    </div>
                    <div className="main__content-chat-entr main__content-idea-entr">
                        <form>
                            <textarea
                                name="text"
                                id="text"
                                value={form.text}
                                onChange={textIdeasHandler}
                            />
                            <button
                                onClick={sendIdeaHandler}
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