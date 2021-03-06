import React, { useEffect, useState } from 'react';
import Post from './Post';
import './styles/App.css';
import {auth, db} from './firebase'
import { Button, Input, makeStyles, Modal } from '@material-ui/core';
import ImageUpload from './ImageUpload';
import InstagramEmbed from 'react-instagram-embed';

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
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {


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
        {user ? (
          <Button onClick={() => auth.signOut()}>Log Out</Button>
          ):(
            <div className="app__loginContainer">
            <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
            <Button onClick={() => setOpen(true)}>Sign Up</Button>
          </div>
        )}

      </div>


    {/* posts */}
    <div className="app_posts">
      <div className="app_postsLeft">
        {
          post.map(({id, post}) => (
            <Post
            key={id}
            user={user}
            username={post.username} 
            caption={post.caption}
            imgUrl={post.imgUrl}/>
            ))
        }
      </div>
      
      <div className="app_postsRight">
        <InstagramEmbed
          url='https://instagr.am/p/Zw9o4/'
          clientAccessToken='123|456'
          maxWidth={320}
          hideCaption={false}
          containerTagName='div'
          protocol=''
          injectScript
          onLoading={() => {}}
          onSuccess={() => {}}
          onAfterRender={() => {}}
          onFailure={() => {}}
        /> 

      </div>
    </div>    

       

    <Post username="Nayomal Lakshitha" caption="Eye is the window" imgUrl="https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png"/>
    <Post username="Elon Musk" caption="Trees are life" imgUrl="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"/>
    <Post username="Din Djarin" caption="Sun is the window" imgUrl="https://c.ndtvimg.com/ixgy7hgcuds_surya-grahan-201_625x300.jpg"/>
    
    {/* uploading images */}
    {username.displayName ? (
      <ImageUpload username={user.displayName}/>        
    ):(
      <h3>Sorry you need to Login to upload... </h3>
    )}

    {/*  */}
      
    </div>
  );
}

export default App;
