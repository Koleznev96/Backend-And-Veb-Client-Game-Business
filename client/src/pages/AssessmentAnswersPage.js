import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router";
import {AuthContext} from "../context/authContext";
import {useMessage} from "../hooks/message.hook";
import {useHttp} from "../hooks/http.hook";
import { toast } from 'react-toastify';
import {Loader} from "../components/Loader";


toast.configure();
export const AssessmentAnswersPage = () => {
    const history = useHistory()
    const [answers, setAnswers] = useState(null);
    const CompanyId = useParams().id;
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
    const [id_answer, setId_answer] = useState(null);
    const [win, setWin] = useState(null);

    const notify = (messageText) => toast.info(messageText);

    const getLink = useCallback(async () => {
        try {
            const data = await request('/api/game/checked_answer', 'POST', {id_user_business: CompanyId}, {
                Authorization: `${auth.token}`
            });
            setAnswers(data);
            const id_users = data.map((item, index ) =>
                item.id
            );
            setId_answer(id_users);
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

    const sendEstimateHandler = async () => {
        try {
            const data = await request('/api/game/hand_check_answer', 'POST', {id_user_business: CompanyId, answer_id: id_answer, win: win}, {
                Authorization: `${auth.token}`
            });
            notify(data.message.toString());
            history.push(`/company/${CompanyId}`);
        } catch (e) {}
    }

    function winAnswerIdOne() {
        if (answers) setWin(answers[0].id);

    }
    function winAnswerIdTwo() {
        if (answers) setWin(answers[1].id);
    }
    function winAnswerIdThree() {
        if (answers) setWin(answers[2].id);
    }

    return (
        <div className="main__content-inner main__content-profile-inner">
            <div className="row justify-content-center justify-content-lg-start">
                <div className="col-12">
                    <div className="main__content-task-item">
                        <div className="main__content-task-item-title">
                            <p>Задание</p>
                        </div>
                        <div className="main__content-task-item-box">
                            <p>Выберите, какой ответ на ваш взгляд более конкретно отвечает на
                                вопрос, и
                                правильно решает проблему поставленную в вопросе</p>
                        </div>
                    </div>
                    <div className="main__content-task-item">
                        <div className="main__content-task-item-title">
                            <p>Вопрос: </p>
                        </div>
                        <div className="main__content-task-item-box main__content-answer-item-box-ask">
                            <p>оответе на поставленный вопрос максимально понятно, расскрывая вашу
                                идею
                                по преодалению проблемы. Используйте полезную информациюответе на
                                поставленный вопрос максимально понятно, расскрывая вашу идею по
                                преодалению проблемы. Используйте полезную информацию Используйте
                                полезную информацию?</p>
                        </div>
                    </div>
                    <div className="main__content-task-item">
                        <div className="main__content-task-item-title">
                            <p>Выберите лучший ответ:</p>
                        </div>
                        <form>
                            <div
                                className="main__content-answer-item-input"
                                onClick={winAnswerIdOne}
                            >
                                <label>
                                    <input type="radio" name="name1"/>
                                    <span
                                        className="main__content-answer-p"
                                    >
                                    { answers && answers[0].answer }
                                </span>
                                </label>

                            </div>
                            <div
                                className="main__content-answer-item-input"
                                onClick={winAnswerIdTwo}
                            >
                                <label>
                                    <input type="radio" name="name1"/>
                                    <span
                                        className="main__content-answer-p"
                                    >
                                    { answers && answers[1].answer }
                                </span>
                                </label>

                            </div>
                            <div
                                className="main__content-answer-item-input"
                                onClick={winAnswerIdThree}
                            >
                                <label>
                                    <input type="radio" name="name1"/>
                                    <span
                                        className="main__content-answer-p"
                                    >
                                    { answers && answers[2].answer }
                                </span>
                                </label>

                            </div>
                            <div className="main__content-answer-item-btn-box">
                                <button
                                    className="main__content-answer-item-btn"
                                    onClick={sendEstimateHandler}
                                    disabled={loading}
                                >
                                    Отправить
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};