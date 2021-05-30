import React, {useCallback, useContext, useEffect, useState} from 'react';
import company from "./img/company/img.jpg";
import {useHistory, useParams} from "react-router";
import {AuthContext} from "../context/authContext";
import {useMessage} from "../hooks/message.hook";
import {useHttp} from "../hooks/http.hook";
import {Loader} from "../components/Loader";
import {Modal} from "../components/Modal/Modal";
import { toast } from 'react-toastify';


toast.configure();
export const CompanyPage = () => {
    const history = useHistory()
    const [dataCompany, setDataCompany] = useState(null);
    const [amount_improvement, setAmount_improvement] = useState(null);
    const CompanyId = useParams().id;
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
    const [modalActive, setModalActive] = useState(false);
    const [form, setForm] = useState({
        withdrawal_money: '', id_user_business: CompanyId
    });

    const notify = (messageText) => toast.info(messageText);

    const formMoneyHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value });
    }
    //

    const getLink = useCallback(async () => {
        try {
            const data = await request(`/api/game/output_user_business/${CompanyId}`, 'GET', null, {
                Authorization: `${auth.token}`
            });
            setDataCompany(data.user_business)
            setAmount_improvement(data.amount_improvement);
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

    function statusTask(status) {
        if (status === "expectation_answer") return "Выполните задание";
        if (status === "assessment_answer") return "Ожидайте оценки вашего ответа";
        if (status === "stop") return "Обновление хадания через: ";
    }

    const checkingTask = async () => {
        if (dataCompany.status_answer === "expectation_answer") history.push(`/completing-task/${CompanyId}`);
    }

    const checkingCheckAnswer = async () => {
        if (dataCompany.status_checked === "true") history.push(`/assessment-answers/${CompanyId}`);
    }

    const levelUp = async () => {
        try {
            const data = await request('/api/game/increase_business_lvl', 'POST', {id_business: CompanyId}, {
                Authorization: `${auth.token}`
            });
            setDataCompany(data.user_business)
            setAmount_improvement(data.amount_improvement);
        } catch (e) {}
    }

    const withdrawMoney = async () => {
        try {
            const data = await request('/api/game/withdrawal_money_business', 'POST', {...form}, {
                Authorization: `${auth.token}`
            });
            notify(data.message.toString());
        } catch (e) {}
    }

    function modalWithdrawMoney() {
        setModalActive(true);
    }


    return (
        <div className="main__content-inner main__content-profile-inner">

            <Modal active={modalActive} setActive={setModalActive}>
                <p>Вывод средств из бизнеса в общий счет</p>
                <p>
                    Счет бизнеса: { dataCompany && dataCompany.finance_business }
                </p>
                <p>
                    Введите сумму
                </p>
                <div className="profile-Form-input col-12 col-sm-12">
                    <input
                        id="withdrawal_money"
                        type="number"
                        name='withdrawal_money'
                        value={form.withdrawal_money}
                        onChange={formMoneyHandler}
                    />
                </div>
                <div className="profile-passForm-btn">
                    <button
                        onClick={withdrawMoney}
                        disabled={loading}
                    >
                        Вывести
                    </button>
                </div>
            </Modal>

            <div className="row justify-content-center justify-content-lg-start">
                <div className="main__content-company-wrapper">
                    <div className="main__content-company-img">
                        <img src={dataCompany ? `../${dataCompany.imageSrc}` : ""} alt=""/>
                    </div>
                    <div className="main__content-company-link">
                        <div className="content-company-link-analitic">
                            <a href="#">Подробная аналитика</a>
                        </div>
                        <div className="content-company-link-output">
                            <a
                                onClick={modalWithdrawMoney}
                            >
                                Вывести деньги в общий счет
                            </a>
                        </div>
                        <div className="content-company-link-answer">
                            <a
                                onClick={checkingCheckAnswer}
                            >Оценить ответы <span>(+10000)</span></a>
                        </div>
                    </div>
                    <div className="main__content-company-box">
                        <div className="main__content-company-box-up">
                            <a
                                onClick={levelUp}
                            >
                                Улучшить предприятие
                            </a>
                            <div className="main__content-company-box-up-text">
                                <p>Стоймость учлучшения предприятия</p>
                                <p>составляет:<span>
                                    { amount_improvement }
                                </span>$</p>
                            </div>
                        </div>
                        <div className="main__content-company-box-task">
                            <a
                                onClick={checkingTask}
                            >Задание</a>
                            <div className="main__content-company-box-task-text">
                                <p>Статус задания: </p>
                                <div className="main__content-company-box-task-text-box">
                                    <span>
                                        { dataCompany && statusTask(dataCompany.status_answer) }
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};