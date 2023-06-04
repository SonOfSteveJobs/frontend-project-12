import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import React from 'react';
import Chat from '../Pages/Chat';
import Login from '../Pages/Login';
import NotFound from '../Pages/NotFound';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Chat />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

function App() {
    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;