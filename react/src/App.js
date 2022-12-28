import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "./App.css";

import Login from './students/Login';
import Register from './students/Register';
import Home from './students/Home'

class App extends Component {
  render(){
    return (
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/home' element = {<Home />}  /> 
        </Routes>
      </BrowserRouter>
      
      
    );
  }
  }

export default App;
