import { useReducer, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Login from './components/Login';
import Register from './components/Register';
import Home from './pages/Home';
import Header from './components/Header';
import AppReducer from './reducers/AppReducer';
import AppContext from './components/AppContext';

import className from 'classnames/bind';
import style from './App.module.scss';

const cx = className.bind(style);

function App() {
    const initialState = {
        user: null,
        posts: [],
    };

    const [state, dispatch] = useReducer(AppReducer, initialState);

    const checkCurrentUser = useCallback( async () => {
        try {
            const token = localStorage.getItem('token');
            const option = {
                method: 'get',
                url: '/api/v1/auth',
                headers: {
                    Authorization: `Bearer ${token}`
                },
            };
            const response = await axios(option);
            if(response.data.data.user) {
                const {userName} = response.data.data.user;
                dispatch({ type: "CURRENT_USER", payload: {userName} });
            }
        } catch (error) {
            console.log(error)
        }
    }, [dispatch])

    useEffect(() => {
        checkCurrentUser();
    }, [checkCurrentUser])

    return (
        <Router>
            <AppContext.Provider value={{ state, dispatch }}>
                <div className={cx('container')}>
                    <div className={cx('wrapper')}>
                        <Header />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                        </Routes>
                    </div>
                </div>
            </AppContext.Provider>
        </Router>
    );
}

export default App;
