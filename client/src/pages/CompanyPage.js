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
    const [dataNew, setdataNew] = useState(null);
    const [userAnswer, setUserAnswer] = useState(null);
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
            setUserAnswer(data.user_answer);
            setdataNew(new Date() - data.user_business.date_waiting);
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
        if (status === "expectation_answer") return "?????????????????? ??????????????";
        if (status === "assessment_answer") return "???????????????? ???????????? ???????????? ????????????";
        if (status === "stop") return "???????????????????? ?????????????? ??????????: ";
    }

    const checkingTask = async () => {
        clearError();
        if (dataCompany.handler_task===true)
            history.push(`/completing-task/${CompanyId}`);
        else if(dataCompany.handler_checked===true)
            history.push(`/assessment-answers/${CompanyId}`);
    };


    const checkingCheckAnswer = async () => {
        if (dataCompany.status_checked === "true") history.push(`/assessment-answers/${CompanyId}`);
    }

    const levelUp = async () => {
        try {
            const data = await request('/api/game/increase_business_lvl', 'POST', {id_business: CompanyId}, {
                Authorization: `${auth.token}`
            });
            setDataCompany(data.user_business);
            setAmount_improvement(data.amount_improvement);
        } catch (e) {}
    }

    const withdrawMoney = async () => {
        try {
            const data = await request('/api/game/withdrawal_money_business', 'POST', {...form}, {
                Authorization: `${auth.token}`
            });
            setDataCompany(data.user_business);
        } catch (e) {}
    }

    function modalWithdrawMoney() {
        setModalActive(true);
    }


    return (
        <div className="main__content-inner main__content-profile-inner">

            <Modal active={modalActive} setActive={setModalActive}>
                <p>?????????? ?????????????? ???? ?????????????? ?? ?????????? ????????</p>
                <p>
                    ???????? ??????????????: { dataCompany && dataCompany.finance_business }
                </p>
                <p>
                    ?????????????? ??????????
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
                        ??????????????
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
                            <a href="#">?????????????????? ??????????????????</a>
                        </div>
                        <div className="content-company-link-output">
                            <a
                                onClick={modalWithdrawMoney}
                            >
                                ?????????????? ???????????? ?? ?????????? ????????
                            </a>
                        </div>
                        {/*<div className="content-company-link-answer">*/}
                        {/*    <a*/}
                        {/*        onClick={checkingCheckAnswer}*/}
                        {/*    >?????????????? ???????????? <span>(+10000)</span></a>*/}
                        {/*</div>*/}
                    </div>
                    <div className="main__content-company-box">
                        <div className="main__content-company-box-up">
                            <a
                                onClick={levelUp}
                            >
                                ???????????????? ??????????????????????({ amount_improvement } ??????.)
                            </a>
                            <div className="main__content-company-box-up-text">
                                {/*{ (error && error.type === "increase_business_lvl") ? (*/}
                                {/*    <p>*/}
                                {/*    /!*    style={[*!/*/}
                                {/*    /!*        GlobalStyle.CustomFontLight,*!/*/}
                                {/*    /!*        styles.textErorrOutputMoney,*!/*/}
                                {/*    /!*    ]}*!/*/}
                                {/*    /!*>*!/*/}
                                {/*        {error.message}*/}
                                {/*    </p>*/}
                                {/*) : null }*/}
                                {/*<p>?????????????????? ???????????????????? ??????????????????????</p>*/}
                                {/*<p>????????????????????:<span>*/}
                                {/*    { amount_improvement }*/}
                                {/*</span>$</p>*/}
                            </div>
                        </div>
                        {dataCompany ? (dataCompany.handler_task===true ? (
                            <div className="main__content-company-box-task">
                                <a
                                    onClick={checkingTask}
                                >?????????????????? ??????????????</a>
                                {/*<div className="main__content-company-box-task-text">*/}
                                {/*    <p>???????????? ??????????????: </p>*/}
                                {/*    <div className="main__content-company-box-task-text-box">*/}
                                {/*        <span>*/}
                                {/*            { dataCompany && statusTask(dataCompany.status_answer) }*/}
                                {/*        </span>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </div>
                        ): null): null }
                        {dataCompany ? (dataCompany.handler_checked===true ? (
                            <div className="main__content-company-box-task">
                                <a
                                    onClick={checkingTask}
                                >?????????????? ????????????</a>
                                {/*<div className="main__content-company-box-task-text">*/}
                                {/*    <p>???????????? ??????????????: </p>*/}
                                {/*    <div className="main__content-company-box-task-text-box">*/}
                                {/*        <span>*/}
                                {/*            { dataCompany && statusTask(dataCompany.status_answer) }*/}
                                {/*        </span>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </div>
                        ): null): null }
                    </div>
                    <div className="main__content-company-box">

                    </div>
                </div>
            </div>
        </div>
    );
};
