import className from 'classnames/bind';
import style from './Header.module.scss';
import { Link } from 'react-router-dom';
import AppContext from '../AppContext';
import { useContext } from 'react';

const cx = className.bind(style);

function Header() {
    const { state, dispatch } = useContext(AppContext);

    const { user } = state;

    const handleSignOut = () => {
        localStorage.removeItem('token');
        dispatch({ type: 'CURRENT_USER', payload: null });
    };

    return (
        <div className={cx('wrapper')}>
            <Link to={'/'} className={cx('logo')}>
                Twitter
            </Link>
            <div className={cx('right')}>
                {!user ? (
                    <div className={cx('no_user')}>
                        <Link to={'/register'}>Register</Link>
                        <Link to={'/login'}>Login</Link>
                    </div>
                ) : (
                    <div className={cx('user_info')}>
                        <h1 className={cx('name')}>Hi, {user.userName}</h1>
                        <div href="/" onClick={() => handleSignOut()}>
                            <a>Sign out</a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Header;
