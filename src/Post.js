import React, { useEffect, useState } from 'react';
import './styles/post.css';
import Avatar from '@material-ui/core/Avatar';
import { db } from './firebase';
import firebase from 'firebase';

const Post = ({postId, user, username, caption, imgUrl}) => {
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')

    useEffect (() => {
        let unsubscribe;
        if (postId) {
            unsubscribe = db
                .collection('posts')
                .doc(postId)
                .collection('comments')
                .orderBy('timestamp', 'desc')
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map((doc) => doc.data()));
                });
        }
        return () => {
            unsubscribe();
        };
    }, [postId]);

    const postComment = (event) => {
        event.preventDefault();

        db.collection("posts").doc(postId).collection("comments").add({
            text: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setComments('');
    }

   

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

            <form action="" className="post__commnetBox">
                <input type="text" className="post__input"
                    placeholder="Add comment..." value={comment}
                    onChange={(e) => setComment(e.target.value)}/>
            </form>
            <button className="post__button"
                disabled={!comment} type="submit" onClick={postComment}> Post</button>
        </div>
    );
};

export default Post;