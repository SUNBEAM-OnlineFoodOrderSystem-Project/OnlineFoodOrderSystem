import React from 'react';

import { BrowserRouter , Routes, Route } from 'react-router-dom';

import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
//import MenuManagement from './pages/MenuManagement.jsx';
import Orders from './pages/OrderManagement.jsx';

import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import PrivateRoute from './components/PrivateRoutes';
import './App.css';

import MenuPage from './pages/MenuManagement.jsx';



function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} /> 
         <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/menu" element={<MenuPage />} />
         <Route path="/orders" element={<Orders />} />
 

       {/* Protected Route
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />  */}

     {/* Menu Management */}
        <Route path="/menu" element={<MenuPage />} />
      
    


      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
