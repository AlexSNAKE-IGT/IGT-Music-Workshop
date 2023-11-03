import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import './AuthForm.css'
import qs from "qs";

const AuthForm = ({ onClose, onLogin }) => {
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        nickname: '',
        email: '',
        birthdate: ''
    });

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isLoginForm && formData.password !== formData.confirmPassword) {
            alert('Пароли не совпадают!');
            return;
        }
        const url = isLoginForm ? 'http://localhost:8000/token' : 'http://localhost:8000/register';
        const data = isLoginForm ? { username: formData.username, password: formData.password } : formData;

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }

        const response = await axios.post(url, qs.stringify(data), config);
        console.log(response.data);

        if (isLoginForm && response.data.access_token) {
            Cookies.set('token', response.data.access_token, { secure: true });
            onLogin();
            onClose();
        }
    }

    const handleClickOutside = (event) => {
        if (event.target.className === 'authBackground') {
            onClose();
        }
    }

    return (
        <div className="authBackground" onClick={handleClickOutside}>
            <div className="authForm">
                <div className="authBox">
                    <span className="authFormText">{!isLoginForm ? "Регистрация" : "Авторизация"}</span>
                    <form className="authInputForm" onSubmit={handleSubmit}>
                        <input className="formInput" type="text" name="username" onChange={handleChange} placeholder={isLoginForm ? "Логин или Email" : "Логин"} required />
                        {!isLoginForm && <input className="formInput" type="email" name="email" onChange={handleChange} placeholder="Email" required />}
                        {!isLoginForm && <input className="formInput" type="text" name="nickname" onChange={handleChange} placeholder="Псевдоним" required />}
                        {!isLoginForm && <input className="formInput" type="date" name="birthdate" onChange={handleChange} required />}
                        <input className="formInput" type="password" name="password" onChange={handleChange} placeholder="Пароль" required />
                        {!isLoginForm && <input className="formInput" type="password" name="confirmPassword" onChange={handleChange} placeholder="Подтвердите пароль" required />}
                        <button className="authButton" type="submit">{isLoginForm ? 'Войти' : 'Зарегистрироваться'}</button>
                    </form>
                    <span className="authFormText" style={{cursor:"pointer", textDecoration:"underline", fontSize:"16px"}} onClick={() => setIsLoginForm(!isLoginForm)}>
                        {isLoginForm ? 'Нет аккаунта?' : 'Уже зарегистрированы?'}
                    </span>
                </div>
            </div>
        </div>
        )
}


export default AuthForm;
