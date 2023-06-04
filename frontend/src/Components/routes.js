import Chat from '../Pages/Chat';
import Login from '../Pages/Login';
import SignUpForm from '../Pages/SignUpForm';
import NotFound from '../Pages/NotFound';
import React from 'react';

const routes = [
    {
        path: "/",
        element: <Chat />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/signup",
        element: <SignUpForm />,
    },
    {
        path: "*",
        element: <NotFound />,
    },
];

export default routes;