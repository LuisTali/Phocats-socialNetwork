import React,{useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css'

import Navbar from './Navbar.jsx';
import Home from './Home';

const App = () =>{
    return(
        <Router>
            <Navbar/>
            <Routes>
                <Route exact path='/' element={<Home/>}/>
                <Route/>
            </Routes>
        </Router>
    )
}

export default App;
