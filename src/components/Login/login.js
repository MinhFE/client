import { useContext, useState } from 'react';
import axios from 'axios';
import AppContext from '../AppContext';
import { useNavigate } from 'react-router-dom';

import className from 'classnames/bind';
import style from './login.module.scss';
const cx = className.bind(style);

function Login() {
    const { dispatch } = useContext(AppContext);
    const [userInput, setUserInput] = useState({ email: '', password: '' });
    const [errMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
    const onchangeHandler = (e) => {
        setUserInput({ ...userInput, [e.target.name]: e.target.value });
    };
    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            const option = {
                method: 'post',
                url: '/api/v1/auth/login',
                data: userInput,
            };

            const response = await axios(option);
            const { token, userName } = response.data.data;
            localStorage.setItem('token', token);
            dispatch({ type: 'CURRENT_USER', payload: { userName } });
            navigate('/');
        } catch (error) {
            setErrorMessage(error.response.data.message);
        }
    };

    return (
        <form className={cx('wrapper')} onSubmit={onSubmitHandler}>
            <h1 className={cx('title')}>Login</h1>
            {errMessage && <div className={cx('err')}>Error: {errMessage}</div>}
            <input
                type="email"
                name="email"
                className={cx('input')}
                placeholder="Enter username..."
                onChange={onchangeHandler}
                value={userInput.email}
            />
            <input
                type="password"
                name="password"
                className={cx('input')}
                placeholder="Enter password..."
                onChange={onchangeHandler}
                value={userInput.password}
            />
            <button className={cx('btn-login')}>Login</button>
        </form>
    );
}

export default Login;
