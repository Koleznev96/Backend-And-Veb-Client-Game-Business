import React, {useContext} from 'react';
import {NavLink, useHistory} from "react-router-dom";
import {useLocation} from "react-router";
import {AuthContext} from "../context/authContext";
import logo from "../pages/img/logo.svg";

export const Navbar = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);

    const logoutHandler = event => {
        event.preventDefault();
        auth.logout();
        history.push('/');
    }

    function GetClassActive(item) {
        const location = useLocation();
        if (location.pathname.toString() === item) {
            return "main__menu-item tab active"
        }
        return "main__menu-item tab"
    }

    return (
        <div className="main__box col-3 col-md-4 col-lg-3">
            <div className="main__sidebar sidebar sidebar-fixed position-fixed">
                <div className="main__logo">
                    <a href="/">
                        <img src={logo} alt=""/>
                    </a>
                </div>
                <nav className="main__menu">
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
                </nav>
            </div>
        </div>
    )
}