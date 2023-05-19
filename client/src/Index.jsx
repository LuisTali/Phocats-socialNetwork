import React,{useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './Index.css'

import Navbar from './components/layout/navbar/Navbar.jsx';
import Home from './components/pages/home/Home.jsx';
import Login from './components/pages/login/Login.jsx'
import Register from './components/pages/register/Register.jsx'
import UserProfile from './components/pages/user/UserProfile';

const App = () =>{
    const [user,setUser] = useState({});
    const [logged,setLogged] = useState(false);

    useEffect(()=>{
        const loggedInUser = localStorage.getItem('user');
        if(loggedInUser){
            setUser(JSON.parse(loggedInUser));
            console.log(JSON.parse(loggedInUser));
        }
    },[logged]);

    return(
        <Router>
            <Navbar {...user} setUser={setUser} setLogged={setLogged}/>
            <Routes>
                <Route exact path='/' element={<Home {...user}/>}/>
                <Route path='/login' element={<Login setLogged={setLogged}/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/user/:id' element={<UserProfile idUserLogged={user.id}/>}/>
            </Routes>
        </Router>
    )
}

export default App;
