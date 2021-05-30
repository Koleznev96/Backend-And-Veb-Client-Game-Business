import React, {useCallback, useContext, useEffect, useState} from 'react';
import plus from './img/icons/plus.svg'
import {AuthContext} from "../context/authContext";
import {useMessage} from "../hooks/message.hook";
import {useHttp} from "../hooks/http.hook";
import {Loader} from "../components/Loader";
import {Modal} from "../components/Modal/Modal.js";
import {NavLink} from "react-router-dom";

export const BusinessesPage = () => {
    const auth = useContext(AuthContext);
    const message = useMessage();
    const {loading, request, error, clearError} = useHttp();
    const [businesses, setBusinesses] = useState(null);
    const [modalActive, setModalActive] = useState(false);
    const [typeBusinesses, setTypeBusinesses] = useState(null);
    const [form, setForm] = useState({
        name_new_business: '', id_new_business: ''
    });

    const formBusinessHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value });
    }

    const getLink = useCallback(async () => {
        try {
            const data = await request('/api/game/output_user_businesses_all', 'POST', null, {
                Authorization: `${auth.token}`
            });
            setBusinesses(data.user_businesses);
            setTypeBusinesses(data.type_businesses);

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

    function routerId(id) {
        return "/company/" + id;
    }

    const creationRequestBusiness = async () => {
        try {
            const data = await request('/api/game/new_business', 'POST', {...form}, {
                Authorization: `${auth.token}`
            });
            setBusinesses(data);
            setModalActive(false);
        } catch (e) {}
    }

    // Компонент UsersList
    function BusinessList(props) {
        // используя метод map() и заполняем данными тег li
        if (!props.props) return;
        const listItems = props.props.map((item, index ) =>
            <NavLink to={routerId(item._id)} key={ index.toString() } className="main__content-allCompany-item">
                <div className="main__content-allCompany-item-img">
                    <img src={item.imageSrc} alt=""/>
                </div>
                <div className="main__content-allCompany-item-bg"/>
                <div className="main__content-allCompany-box">
                    <div className="main__content-allCompany-item-lvl">
                        <p><span>
                            { item.lvl }
                        </span>lvl</p>
                    </div>
                    <div className="main__content-allCompany-item-name">
                        <p>
                            { item.name }
                        </p>
                    </div>
                </div>
                <div className="main__content-allCompany-item-hover"/>
            </NavLink>
        );
        return (
            <div>
                { listItems }
                <div className="main__content-allCompany-item main__content-allCompany-item-plus">
                    <button
                        className="main__content-allCompany-item-border"
                        onClick={() => setModalActive(true)}
                    >
                        <img src={plus} alt=""/>
                    </button>
                </div>
            </div>
        );
    }

    function SelectTypeBusiness(listBusiness) {
        const listItems = listBusiness.listBusiness.map((item, index ) =>
            <option value={item._id} key={ index.toString() }>
                {item.name}
            </option>
        );
        return (
            <select
                className="form-select"
                aria-label="Default select example"
                name="id_new_business"
                value={form.id_new_business}
                onChange={formBusinessHandler}
            >
                { listItems }
            </select>
        );
    }

    function valueBusiness(idBusiness) {
        if (!idBusiness) {
            return typeBusinesses[0].valuable;
        }

        for (let i = 0; i < typeBusinesses.length; i++){
            if (typeBusinesses[i]._id === idBusiness) {
                return typeBusinesses[i].valuable;
            }
        }
    }

    return (
        <div className="main__content-inner">
            <Modal active={modalActive} setActive={setModalActive}>
                <p>Выберите бизнес для открытия:</p>
                { typeBusinesses && <SelectTypeBusiness listBusiness={typeBusinesses}/> }

                <p>
                    Личный счет: добавить р.
                </p>
                <p>
                    Стоймость бизнеса:
                    { typeBusinesses && valueBusiness(form.id_new_business) }
                </p>
                <div className="profile-Form-input col-12 col-sm-12">
                    <input
                        id="name_new_business"
                        type="text"
                        name='name_new_business'
                        value={form.name_new_business}
                        onChange={formBusinessHandler}
                    />
                </div>
                <div className="profile-passForm-btn">
                    <button
                        onClick={creationRequestBusiness}
                        disabled={loading}
                    >
                        sfdsdfhgdfh
                    </button>
                </div>
            </Modal>
            <div className="row justify-content-center justify-content-lg-start">
                    { businesses && <BusinessList props={businesses} /> }
            </div>
        </div>
    );
};
