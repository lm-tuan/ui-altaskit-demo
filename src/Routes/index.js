import React from 'react';
import HomePage from './../Pages/HomePage';
import LoginPage from './../Pages/LoginPage';
import RegisterPage from './../Pages/RegisterPage';
import RestPassPage from './../Pages/RestPassPage';
import VerifyUser from './../Pages/VerifyUser';
import DrawerCutoms from './../components/DrawerCutoms'
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
    },
    {
        path:'/register',
        exact:true,
        main: ({history,location}) => <RegisterPage  history={history} location={location}/>
    },
    {
        path:'/restpass',
        exact:true,
        main: ({history,location}) => <RestPassPage  history={history} location={location}/>
    },
    {
        path:'/verifyEmail',
        exact:true,
        main: ({history,location}) => <VerifyUser  history={history} location={location}/>
    },
    {
        path:'/test',
        exact:true,
        main: ({history,location}) => <DrawerCutoms  history={history} location={location}/>
    }
       
];

export default routes;