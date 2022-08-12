import axios from 'axios';
import { useCallback, useContext, useEffect } from 'react';

import AppContext from '../AppContext';

import className from 'classnames/bind';
import style from './PostLists.module.scss';
import PostItem from './PostItem';
const cx = className.bind(style);

function PostLists() {
    const { state, dispatch } = useContext(AppContext);

    const { posts, user } = state;
    const getAllPosts = useCallback(async () => {
        try {
            const option = {
                method: 'GET',
                url: '/api/v1/post',
            };

            const response = await axios(option);
            const posts = response.data.data.posts;
            dispatch({ type: 'GET_ALL_POSTS', payload: posts });
        } catch (error) {
            console.log(error);
        }
    }, [dispatch]);

    useEffect(() => {
        getAllPosts();
    }, [getAllPosts]);

    const newPosts = posts.map((post) => {
        if (user) {
            return user.userName === post.author.name ? { ...post, isEditable: true } : { ...post, isEditable: false };
        } else {
            return post;
        }
    });

    return (
        <div className={cx('wrapper')}>
            {newPosts.map((post, index) => (
                <PostItem key={index} post={post} />
            ))}
        </div>
    );
}

export default PostLists;
