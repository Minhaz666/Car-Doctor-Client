import React from 'react';
import {createBrowserRouter} from "react-router-dom";
import Main from '../Layout/Main';
import Home from '../pages/Home/Home/Home';
import Login from '../pages/Login/Login';
import About from '../pages/Home/About/About';
import SignUp from '../pages/SignUp/SignUp';
import CheckOut from '../pages/CheckOut/CheckOut';
import Bookings from '../pages/Bookings/Bookings';
import PrivateRoute from './PrivateRoute';


const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
            path: "/",
            element:<Home></Home>
        },
        {
            path: "/about",
            element:<About></About>
        },
        {
            path:'/login',
            element:<Login></Login>
        },
        {
            path:'/signUp',
            element:<SignUp></SignUp>
        },
        {
            path:'/checkout/:id',
            element:<PrivateRoute><CheckOut></CheckOut></PrivateRoute>,
            loader:({params})=>{
              return fetch(`https://car-doctor-server-bh440mlj9-minhaz666.vercel.app/services/${params.id}`)
            }
        },
        {
            path:'/bookings',
            element:<PrivateRoute><Bookings></Bookings></PrivateRoute>,
        },
      ]
    },
  ]);
  

export default router;