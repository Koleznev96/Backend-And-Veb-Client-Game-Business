import React, {useContext, useState} from 'react';
import {NavLink, useHistory} from "react-router-dom";
import {useLocation} from "react-router";
import {AuthContext} from "../context/authContext";
import logoMobile from "../pages/img/logo-mobile.svg";
import menuBtn from "../pages/img/icons/menu-btn.svg";

export const NavbarMobile = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const logoutHandler = event => {
        event.preventDefault();
        auth.logout();
        history.push('/');
    }

    function GetClassActive(item) {
        const location = useLocation()
        if (location.pathname.toString() === item) {
            return "main__menu-item tab active"
        }
        return "main__menu-item tab"
    }

    function menuDropdownVisible() {
        setDropdownVisible(!dropdownVisible);
    }

    return (
        <div className="mobile__menu container-fluid">
            <div className="row justify-content-between">
                <div className="mobile__logo logo col-6 ">
                    <a href="">
                        <img src={logoMobile} alt=""/>
                    </a>
                </div>
                <div
                    className="mobile__menu-btn col-6"
                    onClick={menuDropdownVisible}
                >
                    <img src={menuBtn} alt=""/>
                </div>
            </div>
            <div className="main__menu" style={{display: dropdownVisible ? 'block' : 'none'}}>
                <div className="main__menu-tabs">
                    <div className={ GetClassActive("/profile") }>
                        <NavLink to="/profile"><p>Профиль</p></NavLink>
                    </div>
                    <div className={ GetClassActive("/businesses") }>
                        <NavLink to="/businesses"><p>Бизнес</p></NavLink>
                    </div>
                    <div className={ GetClassActive("/chat") }>
                        <NavLink to="/chat"><p>Общий чат</p></NavLink>
                    </div>
                    <div className={ GetClassActive("/news") }>
                        <NavLink to="/news"><p>Новости</p></NavLink>
                    </div>
                    <div className={ GetClassActive("/ideas") }>
                        <NavLink to="/ideas"><p>Идеи</p></NavLink>
                    </div>
                    <div className="main__menu-item tab" onClick={logoutHandler}>
                        <p>Выйти</p>
                    </div>
                </div>
            </div>
        </div>
    )
}