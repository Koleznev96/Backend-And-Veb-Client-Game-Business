import React, {useCallback, useContext, useEffect, useState} from 'react';
import {AuthContext} from "../context/authContext";
import {useMessage} from "../hooks/message.hook";
import {useHttp} from "../hooks/http.hook";
import {Loader} from "../components/Loader";

export const NewsPage = () => {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
    const [news, setNews] = useState(null);

    const getLink = useCallback(async () => {
        try {
            const data = await request('/api/news/output_news', 'POST', null, {
                Authorization: `${auth.token}`
            });
            setNews(data);
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
    function NewsList(props) {
        // для удобства записываем значение props.users в переменную users
        // используя метод map() и заполняем данными тег li
        const listItems = props.props.map((item, index ) =>
            <div key={ index.toString() } className="main__content-news-item">
                <div className="content-news-item-box">
                    <div className="content-news-item-title">
                        <p>
                            { item.heading }
                        </p>
                    </div>
                    <div className="content-news-item-box-container">
                        <div className="content-news-item-update">
                            <p>Обновление</p>
                        </div>
                        <div className="content-news-item-date">
                            <p>25.04.2021<span>14:30</span></p>
                        </div>
                    </div>

                </div>
                <div className="content-news-item-text">
                    <p>
                        { item.heading }
                    </p>
                </div>
            </div>
        );
        // Возвращаем список с именами пользователей
        return (
            <ul style={{adding: '0px'}}> { listItems } </ul>
        );
    }

    return (
        <div className="main__content-inner">
            <div className="row justify-content-center justify-content-lg-start">
                <div className="main__content-news-wrapper">
                    { news && <NewsList props={news} /> }
                </div>

            </div>
        </div>
    );
};
