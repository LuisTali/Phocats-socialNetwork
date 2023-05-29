import React,{useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './Index.css'

import Navbar from './components/layout/navbar/Navbar.jsx';
import Home from './components/pages/home/Home.jsx';
import Login from './components/pages/login/Login.jsx'
import Register from './components/pages/register/Register.jsx'
import UserProfile from './components/pages/user/UserProfile.jsx';
import Friends from './components/pages/friends/Friends.jsx';
import PublicationsPerTag from './components/pages/publisPerTag/PublicationsPerTag';
import PublicationPage from './components/pages/publicationPage/PublicationPage';
import Footer from './components/layout/footer/Footer';

const App = () =>{
    const [user,setUser] = useState({});
    const [logged,setLogged] = useState(false);

    useEffect(()=>{
        const loggedInUser = localStorage.getItem('user');
        if(loggedInUser){
            setUser(JSON.parse(loggedInUser));
        }
    },[logged]);

    if(Object.entries(user).length === 0){ //Si user no tiene pares clave-valor esta vacio
        return <Router>
            <Navbar/>
            <Routes>
                <Route path='/' element={<Login setLogged={setLogged}/>}/>
                <Route path='/register' element={<Register/>}/>
            </Routes>
        </Router>
    }else{
        return(
            <Router>
                <Navbar {...user} setUser={setUser} setLogged={setLogged}/>
                <Routes>
                    <Route exact path='/' element={<Home {...user}/>}/>
                    <Route path='/login' element={<Login setLogged={setLogged}/>}/>
                    <Route path='/friends' element={<Friends/>}/>
                    <Route path='/register' element={<Register/>}/>
                    <Route path='/user/:id' element={<UserProfile idUserLogged={user.id}/>}/>
                    <Route path='/publication/:id' element={<PublicationPage/>}/>
                    <Route path='/tags/:nameTag' element={<PublicationsPerTag/>}/>
                </Routes>
            </Router>
        )
    }
    
}

export default App;
