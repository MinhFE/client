import { useContext, useState } from 'react';
import axios from 'axios';
import AppContext from '../AppContext';

import className from 'classnames/bind';
import style from './PostItem.module.scss';
const cx = className.bind(style);

function PostItem({ post }) {
    const { dispatch } = useContext(AppContext);

    const [postToEdit, setPostToEdit] = useState(post);
    const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
    const [openUpdateConfirm, setOpenUpdateConfirm] = useState(false);
    
    const date = new Date(post.createdAt);
    const updatePost = async () => {
        try {
            setOpenUpdateConfirm(false);
            const token = localStorage.getItem('token');
            const option = {
                method: 'PUT',
                url: `/api/v1/post/${post._id}`,
                data: postToEdit,
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            };
            await axios(option);
            dispatch({ type: 'UPDATE_ONE_POST', payload: { ...postToEdit } });
        } catch (error) {
            console.log(error);
        }
    };

    const deletePost = async () => {
        try {
            setOpenDeleteConfirm(false);
            const token = localStorage.getItem('token');
            const option = {
                method: 'DELETE',
                url: `/api/v1/post/${post._id}`,
                headers: {
                    Authorization: 'Bearer ' + token,
                },
            };
            await axios(option);
            dispatch({ type: 'DELETE_ONE_POST', payload: { _id: post._id } });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={cx('post-item')}>
            <div>
                <div className={cx('content')}>{post.content}</div>
                <div className={cx('navigation')}>
                    <div className={cx('left')}>
                        <h3 className={cx('author')}>by {post.author.name}</h3>
                        <h3 className={cx('date')}>
                            Date: {`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}
                        </h3>
                    </div>
                    {post.isEditable && (
                        <div className={cx('right')}>
                            {openDeleteConfirm ? (
                                <>
                                    <span className={cx('btn')}>Are you sure?</span>
                                    <span className={cx('btn')} onClick={deletePost}>
                                        Yes
                                    </span>
                                    <span className={cx('btn')} onClick={() => setOpenDeleteConfirm(false)}>
                                        No
                                    </span>
                                </>
                            ) : (
                                <>
                                    <span className={cx('btn')} onClick={() => setOpenUpdateConfirm(true)}>
                                        Edit
                                    </span>
                                    <span className={cx('btn')} onClick={() => setOpenDeleteConfirm(true)}>
                                        Delete
                                    </span>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
            {openUpdateConfirm && (
                <form className={cx('update')}>
                    <textarea
                        className={cx('content-update')}
                        name="content"
                        placeholder="What's happening?"
                        value={postToEdit.content}
                        onChange={(e) => setPostToEdit({ ...postToEdit, content: e.target.value })}
                    ></textarea>
                    <div className={cx('btn')}>
                        <button type="button" className={cx('btn-update')} onClick={updatePost}>
                            Update
                        </button>
                        <span className={cx('btn')} onClick={() => setOpenUpdateConfirm(false)}>
                            Cancel
                        </span>
                    </div>
                </form>
            )}
        </div>
    );
}

export default PostItem;
