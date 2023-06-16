import React,{useContext, useEffect, useState} from 'react';
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

import ModalContextProvider from './context/modalContext/ModalContext';
import LocationContextProvider, { LocationContext } from './context/locationContext/LocationContext';
import { UserContext } from './context/userContext/UserContext';

export const AppContext = React.createContext(); //Creo context, luego a cada elemento se lo paso con los valores deseados, lo importo en ese componente y lo utilizo, como hice en PublicationPopUp.

const App = () =>{
    const [user,setUser] = useState({});
    const [logged,setLogged] = useState(false);
    const baseUrl = 'http://localhost:5000/';

    let dataContext = {
        ...user,
        setUser,
        logged,
        setLogged,
        baseUrl,
        idUserLogged:user.id
    };

    useEffect(()=>{
        const loggedInUser = localStorage.getItem('user');
        if(loggedInUser){
            setUser(JSON.parse(loggedInUser));
        }
    },[logged]);

    if(Object.entries(user).length === 0){ //Si user no tiene pares clave-valor esta vacio
        return <Router>
            <ModalContextProvider>
            <LocationContextProvider>
            <AppContext.Provider value={{baseUrl:baseUrl,setLogged}}>
            <Navbar/>
            <Routes>
                <Route path='/' element={ <Login/> }/>
                <Route path='/register' element={ <Register/> }/>
            </Routes>
            </AppContext.Provider>
            </LocationContextProvider>
            </ModalContextProvider>
        </Router>
    }else{
        return <Router>
                <ModalContextProvider>
                <LocationContextProvider>
                <AppContext.Provider value={dataContext}>
                <Navbar/>
                <Routes>
                    <Route exact path='/' element={ <Home/> }/>
                    <Route path='/user/:id' element={ <UserProfile/> }/>
                    <Route path='/tags/:nameTag' element={ <PublicationsPerTag/> }/>
                    <Route path='/friends' element={ <Friends/> }/>
                    <Route path='/register' element={ <Register/> }/>
                </Routes>
                </AppContext.Provider>
                </LocationContextProvider>
                </ModalContextProvider>
            </Router>
    }
    
}

export default App;
