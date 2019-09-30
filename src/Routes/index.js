import React from 'react';
import HomePage from './../Pages/HomePage';
import LoginPage from './../Pages/LoginPage';

const routes = [
    {
        path:'/',
        exact:true,
        main: ({history,location}) => <HomePage   history={history} location={location}/>
    },
    {
        path:'/login',
        exact:true,
        main: ({history,location}) => <LoginPage  history={history} location={location}/>
    }
       
];

export default routes;