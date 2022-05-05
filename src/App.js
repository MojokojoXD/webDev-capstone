// @ts-nocheck
import { Routes, Route } from 'react-router-dom';
import Landing from './landingPage/Landing';
import Home from './landingPage/Home';
import Login from './landingPage/Login';
import Register from './landingPage/Register';
import './App.css';
import Dashboard from './dashboard/Dashboard';
import DashboardUser from './dashboard/DashUser';
import {Navigate} from 'react-router-dom';
import { useState,createContext } from 'react';

export const authContext = createContext(null);

function App() {
  const [isAuth,setAuth] = useState(false);

  const getAuth = (value) => {
    setAuth(value)
  }


  return (   
      <authContext.Provider value={{getAuth: getAuth}}>

        <Routes>
          <Route path='/' element={<Landing/>}>
            <Route path='/' element={<Home/> }/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='register' element={<Register/>}/>
          </Route>
        <Route path='/redirect' element={<Dashboard/>}/>
        {/* <Route path='/dashboard' element={<Dashboard/>}/> */}
        <Route path='/dashboard/:username/:id' element={<DashboardUser/>}/>
        <Route path='/logout' element={<Navigate to='/' replace />}/>
        <Route path='*' element={<Navigate to='/' replace/>}/>
        </Routes>
      </authContext.Provider>
  )
}

export default App;
