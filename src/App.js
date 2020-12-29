import React, { useState } from 'react';
import Post from './Post';
import './styles/App.css';

function App() {

  const [post,setPost] = useState([
    {
        username:"Nayomal Lakshitha",
        caption: "Eye is the window",
        imgUrl: "https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png"
    },
    {
        username:"Elon Musk",
        caption: "Sun is the window",
        imgUrl: "https://c.ndtvimg.com/ixgy7hgcuds_surya-grahan-201_625x300.jpg"
    }
]);

  return (
    <div className="app">
      {/* header */}
      <div className="app__header">
        <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="" className="app__headerImage"/>

      </div>

    {/* posts */}

    {
      post.map(post => (
        <Post
          username={post.username} 
          caption={post.caption}
          imgUrl={post.imgUrl}/>
      ))
    }

    <Post username="Nayomal Lakshitha" caption="Eye is the window" imgUrl="https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png"/>
    <Post username="Elon Musk" caption="Trees are life" imgUrl="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"/>
    <Post username="Din Djarin" caption="Sun is the window" imgUrl="https://c.ndtvimg.com/ixgy7hgcuds_surya-grahan-201_625x300.jpg"/>
    

    {/*  */}
      
    </div>
  );
}

export default App;
