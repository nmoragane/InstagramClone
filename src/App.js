import React, { useEffect, useState } from 'react';
import Post from './Post';
import './styles/App.css';
import {auth, db} from './firebase'
import { Button, Input, makeStyles, Modal } from '@material-ui/core';
import ImageUpload from './ImageUpload';

function getModalStyle() {
  const top = 50 ;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {

  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const [post,setPost] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null)

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser){
        //logged in
        console.log(authUser)
        setUser(authUser);
      } else {
        //logged out
        setUser(null);
      }
    })

    return () => {
      unsubscribe();
    }
  },[user, username])

  useEffect(()=>{
    db.collection('posts').onSnapshot(snapshot => {


      setPost(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })))
    })
  },[])

  const signUp = (event) => {
    event.preventDefault();

    auth.createUserWithEmailAndPassword(email, password)
    .then((authUser)=> {
      return authUser.user.updateProfile({
        displayName:username
      })
    })
    .catch((error) => alert(error.message));
  }

  const signIn = (event) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email,password)
      .catch((err)=> alert(err.message));

    setOpenSignIn(false)
  }

  

  return (
    <div className="app">

      {/* uploading images */}
      <ImageUpload/>
      {/* caption input */}
      {/* file picker */}
      {/* post button */}

      <Modal open = {open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="" className="app__headerImage"/>
            </center>

            <Input placeholder="Username" type="text" value={username} onChange={(e)=> setUsername(e.target.value)}/>          
            <Input placeholder="Email" type="text" value={email} onChange={(e)=> setEmail(e.target.value)}/>          
            <Input placeholder="Password" type="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>          
            <Button onClick={signUp}>Sign Up</Button>
          </form>          
        </div>
      </Modal>

      {/* modal for sign in */}

      <Modal open = {openSignIn} onClose={() => setOpenSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="" className="app__headerImage"/>
            </center>
                      
            <Input placeholder="Email" type="text" value={email} onChange={(e)=> setEmail(e.target.value)}/>          
            <Input placeholder="Password" type="password" value={password} onChange={(e)=> setPassword(e.target.value)}/>          
            <Button onClick={signIn}>Sign In</Button>
          </form>          
        </div>
      </Modal>  

      {/* header */}
      <div className="app__header">
        <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="" className="app__headerImage"/>

      </div>

      {user ? (
        <Button onClick={() => auth.signOut()}>Log Out</Button>
      ):(
        <div className="app__loginbutton">
          <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
          <Button onClick={() => setOpen(true)}>Sign Up</Button>
        </div>
      )}

    {/* posts */}

    {
      post.map(({id, post}) => (
        <Post
          key={id}
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
