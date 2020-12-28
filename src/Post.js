import React from 'react';
import './styles/post.css';
import Avatar from '@material-ui/core/Avatar';

const Post = () => {
    return (
        <div className="post">
            
            {/* header */}
            <div className="post__header">
                <Avatar
                    className="post__avatar"
                    alt="username"
                    src="/static/images/avatar/1.jpg"
                />
                <h3>Username</h3>
            </div>
            

            {/* image */}
            <img src="https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png" alt="" className="post__image"/>

            {/* username and caption */}
            <h4 className="post__text"><strong>usrname</strong> Eye is the window to the world </h4>

            
        </div>
    );
};

export default Post;