import React, {useCallback, useContext, useEffect, useState} from 'react';
import mark from "./img/icons/mark.svg";
import markRed from "./img/icons/mark-red.svg";
import {useHistory, useParams} from "react-router";
import {AuthContext} from "../context/authContext";
import {useMessage} from "../hooks/message.hook";
import {useHttp} from "../hooks/http.hook";
import { toast } from 'react-toastify';
import {Loader} from "../components/Loader";

toast.configure();
export const CompletingTaskPage = () => {
    const history = useHistory()
    const [question, setQuestion] = useState(null);
    const [article, setArticle] = useState(null);
    const CompanyId = useParams().id;
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
    const [form, setForm] = useState({
        answer: '', id_user_business: CompanyId
    });

    const notify = (messageText) => toast.info(messageText);

    const formAnswerHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    const getLink = useCallback(async () => {
        try {
            const data = await request('/api/game/output_question', 'POST', {id_user_business: CompanyId}, {
                Authorization: `${auth.token}`
            });
            setQuestion(data.question);
            setArticle(data.article);
        } catch (e) {}
    }, [auth.token, CompanyId, request]);

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

    const sendAnswerHandler = async () => {
        try {
            const data = await request('/api/game/add_answer', 'POST', {...form}, {
                Authorization: `${auth.token}`
            });
            notify(data.message.toString());
            history.push(`/company/${CompanyId}`);
        } catch (e) {}
    }

    return (
        <div className="main__content-inner main__content-profile-inner">
            <div className="row justify-content-center justify-content-lg-start">
                <div className="col-5">
                    <div className="main__content-task-item">
                        <div className="main__content-task-item-title">
                            <p>Задание</p>
                        </div>
                        <div className="main__content-task-item-box">
                            <p>ответе на поставленный вопрос максимально понятно, расскрывая вашу
                                идею по преодалению проблемы. Используйте полезную информацию</p>
                        </div>
                    </div>
                    <div className="main__content-task-item">
                        <div className="main__content-task-item-title">
                            <p>Вопрос</p>
                        </div>
                        <div className="main__content-task-item-box main__content-task-item-box-ask">
                            <p>
                                { question && question.question }
                            </p>
                        </div>
                    </div>
                    <div className="main__content-task-item">
                        <div className="main__content-task-item-title">
                            <p>Напишите свой ответ: </p>
                        </div>
                        <form>
                            <textarea
                                placeholder="ответе на поставленный вопрос максимально понятно,
                                расскрывая вашу идею по преодалению проблемы.
                                Используйте полезную информацию"
                                name="answer"
                                value={form.answer}
                                onChange={formAnswerHandler}
                            >
                            </textarea>
                            <button
                                onClick={sendAnswerHandler}
                                disabled={loading}
                            >Отправить</button>
                        </form>

                    </div>

                </div>
                <div className="col-6">
                    <div className="main__content-task-info">
                        <div className="main__content-task-info-title">
                            <p>Полезная инфа</p>
                            <img
                                className="main__content-task-info-title-img active"
                                src={mark}
                                alt=""
                            />
                            <img
                                className="main__content-task-info-title-img-red"
                                src={markRed}
                                alt=""
                            />
                        </div>
                        <div className="main__content-task-info-text">
                            <p>
                                { article && article.text }
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};