import axios from 'axios';
import AppContext from '../AppContext';

import className from 'classnames/bind';
import style from './Form.module.scss';
import { useContext, useState } from 'react';

const cx = className.bind(style);

function Form() {
    const { state, dispatch } = useContext(AppContext);
    const { user } = state;
    const [postInput, setPostInput] = useState({content: ""});
    const [errorMessage, setErrorMessage] = useState(null);

    const onSubmitHandle = async (e) => {
        try {
            // e.preventDefault();
            const token = localStorage.getItem('token');
            const option = {
                method: 'POST',
                url: "/api/v1/post",
                data: postInput,
                headers: {
                    Authorization: 'Bearer ' + token,
                }
            };

            const response = await axios(option);
            const {post} = response.data.data;
            const author = {_id: post.author, name: user.userName}

            dispatch({...post, author, isEditable: true});

            setPostInput("");
            
        } catch (error) {
            setErrorMessage(error.response.data.message);
        }
    }

    return (
        <form className={cx('wrapper')} onSubmit={onSubmitHandle}>
            {errorMessage && (
                <div>Error: {errorMessage}</div>
            )}
            <textarea 
                name="content" 
                className={cx('content')} 
                placeholder="What happening?"
                value={postInput.content}    
                onChange={(e) => setPostInput({...postInput, [e.target.name]: e.target.value})}
            ></textarea>
            <button type="submit" className={cx('btn_submit')}>tweet</button>
        </form>
    );
}

export default Form;
