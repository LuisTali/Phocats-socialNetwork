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
import Layout from './components/layout/Layout.jsx';

import { menuRoutes } from './routes/menuRoutes.js';

import ModalContextProvider from './context/modalContext/ModalContext';
import LocationContextProvider, { LocationContext } from './context/locationContext/LocationContext';
import UploadContextProvider from './context/uploadContext/UploadContext.jsx';
import ScreenSizeContextProvider from './context/screenSizeContext/ScreenSizeContext.jsx';

export const AppContext = React.createContext(); //Creo context, luego a cada elemento se lo paso con los valores deseados, lo importo en ese componente y lo utilizo, como hice en PublicationPopUp.

const App = () =>{
    const [user,setUser] = useState({});
    const [logged,setLogged] = useState(false);
    const [forceRender,setForceRender] = useState(0);
    const baseUrl = 'http://localhost:5000/';

    let dataContext = {
        ...user,
        setUser,
        logged,
        setLogged,
        baseUrl,
        idUserLogged:user.id,
        setForceRender,
        forceRender
    };

    useEffect(()=>{
        const loggedInUser = localStorage.getItem('user');
        if(loggedInUser){
            setUser(JSON.parse(loggedInUser));
        }
    },[logged,forceRender]);

    if(Object.entries(user).length === 0){ //Si user no tiene pares clave-valor esta vacio
        return <Router>
            <ModalContextProvider>
            <LocationContextProvider>
            <ScreenSizeContextProvider>
            <AppContext.Provider value={{baseUrl:baseUrl,setLogged}}>
            <Navbar/>
            <Routes>
                <Route path='/' element={ <Login/> }/>
                <Route path='/register' element={ <Register/> }/>
            </Routes>
            </AppContext.Provider>
            </ScreenSizeContextProvider>
            </LocationContextProvider>
            </ModalContextProvider>
        </Router>
    }else{
        return <Router>
                <ModalContextProvider>
                <LocationContextProvider>
                <UploadContextProvider>
                <ScreenSizeContextProvider>
                <AppContext.Provider value={dataContext}>
                <Routes>
                    <Route element={<Layout/>}>
                        {menuRoutes.map(({id,path,Element})=>{
                            return <Route key={id} path={path} element={<Element/>} />
                        })}
                    </Route>
                </Routes>
                </AppContext.Provider>
                </ScreenSizeContextProvider>
                </UploadContextProvider>
                </LocationContextProvider>
                </ModalContextProvider>
            </Router>
    }
    
}

export default App;
