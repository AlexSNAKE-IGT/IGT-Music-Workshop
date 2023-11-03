import React, { useState, useEffect, useCallback } from 'react';
import './Header.css'
import searchIcon from "../../assets/icons/search.svg"
import AuthForm from "../../modules/AuthForm/AuthForm.jsx"
import Cookies from 'js-cookie';

const Header = ({menuSwitch,onMenuSwitchChange,onActiveProfileButton}) => {
    const [showAuthForm, setShowAuthForm] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleMenuSwitchChange = (newMenuSwitch) => {
        onMenuSwitchChange(newMenuSwitch);
    };

    const handleActiveProfileButton = (newActiveProfileButton) => {
        onActiveProfileButton(newActiveProfileButton);
    };

    useEffect(() => {
        const checkLoginStatus = () => {
            const token = Cookies.get('token');
            if (token) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        };

        checkLoginStatus();

    window.addEventListener('storage', checkLoginStatus);

    return () => {
        window.removeEventListener('storage', checkLoginStatus);
    };
    }, []);

    const checkLoginStatus = () => {
        const token = Cookies.get('token');
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    };

//    const handleLogout = useCallback(() => {
//        Cookies.remove('token');
//        setIsLoggedIn(false);
//        }, []);

    const handleLoginClick = useCallback(() => {
        if (!isLoggedIn) {
            console.log("Привет")
            setShowAuthForm(true);
        }
    }, [isLoggedIn]);


    return(
        <>
        <div className="headerBlur"/>
        <div className="header">
            <div className="headerBox">
                <p className="logo">
                    <span className="spanTitle">IGT</span>
                    <span className="spanDep" onClick={() => {handleMenuSwitchChange("music");handleActiveProfileButton("")}} >MUSIC WORKSHOP</span>
                </p>
                <div>
                    <button className="navButton selected" onClick={() => {handleMenuSwitchChange("music");handleActiveProfileButton("")}}>ГЛАВНАЯ</button>
                    <button className="navButton">СТУДИЯ</button>
                    <button className="navButton">О НАС</button>
                </div>
                <div className="searchBox">
                    <input className="searchInput" placeholder="НАЙТИ"/>
                    <img className="searchIcon" alt="searchIcon" src={searchIcon}/>
                </div>
                {isLoggedIn ? (
                    <button onClick={() => handleMenuSwitchChange("profile")} className="navButton selected">Профиль</button>
                    ) : (
                        <button onClick={() => handleLoginClick()} className="navButton selected">ВОЙТИ</button>
                        )}
            </div>
        </div>
        {showAuthForm && <AuthForm onClose={() => setShowAuthForm(false)} onLogin={checkLoginStatus} />}
        </>
        );
};

export default Header;