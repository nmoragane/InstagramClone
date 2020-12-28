import Post from './Post';
import './styles/App.css';

function App() {
  return (
    <div className="app">
      {/* header */}
      <div className="app__header">
        <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="" className="app__headerImage"/>

      </div>

    {/* posts */}
    <Post/>
    <Post/>
    <Post/>

    {/*  */}
      
    </div>
  );
}

export default App;
