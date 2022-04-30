// @ts-nocheck
import { Routes, Route } from 'react-router-dom';
import Landing from './landingPage/Landing';
import Home from './landingPage/Home';
import Login from './landingPage/Login';
import Register from './landingPage/Register';
import './App.css';
import Dashboard from './dashboard/Dashboard';
import DashboardUser from './dashboard/DashUser';

function App() {

  return (   
      <Routes>
        <Route path='/' element={<Landing/>}>
          <Route path='/' element={<Home/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='register' element={<Register/>}/>
        </Route>
      <Route path='/redirect' element={<Dashboard/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/dashboard/:username/:id' element={<DashboardUser/>}/>
      <Route path='*' element={<h1>Page does not exist</h1>}/>
      </Routes>
  )
}

export default App;
