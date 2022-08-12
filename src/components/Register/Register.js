import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../AppContext';
import axios from 'axios';

import className from 'classnames/bind';
import style from './Register.module.scss';

const cx = className.bind(style);

function Register() {
    const {dispatch} = useContext(AppContext);
    const [userInput, setUserInput] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [errMessage, setErrorMessage] = useState(null);
    const navigation = useNavigate();

    const onChangeHandler = (e) => {
        setUserInput({ ...userInput, [e.target.name]: e.target.value });
    };

    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            const option = {
                method: 'POST',
                url: '/api/v1/auth/register',
                data: userInput,
            };

            const response = await axios(option);
            const { token, userName } = response.data.data;
            localStorage.setItem('token', token);
            dispatch({ type: 'CURRENT_USER', payload: { userName } });
            navigation('/', { replace: true });
        } catch (error) {
            setErrorMessage(error.response.data.message);
        }
    };

    return (
        <form className={cx('wrapper')} onSubmit={onSubmitHandler}>
            <h1 className={cx('title')}>Register</h1>
            {errMessage && (Array.isArray(errMessage) ? (
                errMessage.map((err) => (<h3>ErrorArray: {err}</h3>))
            ) : (
                <h3>Error: {errMessage}</h3>
            ))}
            <input
                type="email"
                className={cx('input')}
                placeholder="Enter email..."
                name="email"
                value={userInput.email}
                onChange={onChangeHandler}
            />
            <input
                type="text"
                className={cx('input')}
                placeholder="Enter username..."
                name="name"
                value={userInput.name}
                onChange={onChangeHandler}
            />
            <input
                type="text"
                className={cx('input')}
                placeholder="Enter password..."
                name="password"
                value={userInput.password}
                onChange={onChangeHandler}
            />
            <button className={cx('btn-login')}>Register</button>
        </form>
    );
}

export default Register;
