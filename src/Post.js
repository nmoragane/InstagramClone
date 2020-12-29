import React, { useState } from 'react';
import './styles/post.css';
import Avatar from '@material-ui/core/Avatar';

const Post = ({username, caption, imgUrl}) => {

   

    return (
        <div className="post">
            
            {/* header */}
            <div className="post__header">
                <Avatar
                    className="post__avatar"
                    alt="username"
                    src="/static/images/avatar/1.jpg"
                />
                <h3>{username}</h3>
            </div>
            

            {/* image */}
            <img src={imgUrl} alt="" className="post__image"/>

            {/* username and caption */}
            <h4 className="post__text"><strong>{username}</strong> {caption} </h4>

            
        </div>
    );
};

export default Post;