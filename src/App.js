// import './App.css';
import Login from './Component/Login';
import { BrowserRouter as Router, Route ,Routes} from 'react-router-dom';
import SignUP from './Component/SignUP';
import Navbar from './Component/Navbar';
import Home from './Component/Home';
import ProductDetail from './Component/ProductDetail';
import 'bootstrap/dist/css/bootstrap.min.css';
import {ref, onValue} from 'firebase/database';
import React, {useState, useEffect} from 'react';
import {db} from './firebase-config';
import Invertory from './Component/Invertory';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "./firebase-config";

function App() {
  //create a function to determine in which device the user is using
    //fetches the data from the firebase database
    const [data, setData] = useState([]);
    useEffect(() => {
      const postListRef = ref(db, "/item");
      onValue(postListRef, (snapshot) => {
        const newState = [];
        snapshot.forEach((childSnapshot) => {
          const item = childSnapshot.val();
          item.key = childSnapshot.key;
          newState.push({ "key": item.key, "item": item });
          
        });
        setData(newState);
      });
    }, []);
    const checkDevice = () => {
      const device = window.innerWidth;
      if (device > 768) {
        return true;
      } else {
        return false;
      }
    }

    const [user, setUser] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (currentuser) => {
      if (currentuser) {
        setUser(currentuser);
      } else {
        setUser(null);
      }
    });
  }, [user]);
  const email=user?user.email:"";

  return (
    <Router>
      <div>
        {checkDevice() ? (
            <div className='App'>
                <Navbar data={data} user={user}/>
                <Routes>
                <Route path="/Invertory" element={<Invertory data={data} email={email} />}/>
                  <Route path="/" element={<Home data={data}/>} />
                  <Route path="/Login" element={<Login />} />
                  <Route path="/SignUP" element={<SignUP />} />
                  <Route path="/ProductDetail/:id" element={<ProductDetail data={data}/>} />
                  <Route path="*" element={<h1>404 Not Found</h1>} />
                  
                </Routes>
              </div>
  ):(
            <div className='App'>
                <p>Please use a device with a screen size of at least 768px to view this website.<br/> Inshort Please open in desktop site or desktop.</p>
            </div>
        )}
      </div>
    </Router>
  );
}
  export default App;
