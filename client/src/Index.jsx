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
import Footer from './components/layout/footer/Footer';

export const AppContext = React.createContext(); //Creo context, luego a cada elemento se lo paso con los valores deseados, lo importo en ese componente y lo utilizo, como hice en PublicationPopUp.
const baseUrl = 'http://localhost:5000/';

const App = () =>{
    const [user,setUser] = useState({});
    const [logged,setLogged] = useState(false);
    const [lastLocation,setLastLocation] = useState('/');

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
                <Route path='/' element={<AppContext.Provider value={{baseUrl:baseUrl,setLogged}}>
                    <Login/>
                </AppContext.Provider>}/>
                <Route path='/register' element={<Register/>}/>
            </Routes>
        </Router>
    }else{
        return <Router>
                <Navbar {...user} setUser={setUser} setLogged={setLogged}/>
                <Routes>
                    <Route exact path='/' element={<AppContext.Provider value={{baseUrl:baseUrl,idLogged:user.id,lastLocation,setLastLocation,...user}}>
                        <Home/>
                    </AppContext.Provider> }/>
                    <Route path='/user/:id' element={<AppContext.Provider value={{baseUrl:baseUrl,idUserLogged:user.id,lastLocation,setLastLocation}}>
                        <UserProfile/>
                    </AppContext.Provider>}/>
                    <Route path='/tags/:nameTag' element={<AppContext.Provider value={{baseUrl:baseUrl,idLogged:user.id,lastLocation,setLastLocation}}>
                        <PublicationsPerTag/>
                    </AppContext.Provider>}/>
                    <Route path='/friends' element={<AppContext.Provider value={{baseUrl:baseUrl,idLogged:user.id,lastLocation,setLastLocation,...user}}>
                        <Friends/>
                    </AppContext.Provider>}/>
                    <Route path='/login' element={<AppContext.Provider value={{baseUrl:baseUrl,setLogged}}>
                        <Login/>
                    </AppContext.Provider>}/>
                    <Route path='/register' element={<Register/>}/>
                </Routes>
            </Router>
    }
    
}

export default App;
