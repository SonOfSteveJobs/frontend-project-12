import {Route, Routes} from 'react-router';
import React from 'react';
import Chat from '../Pages/Chat';
import Login from '../Pages/Login';
import NotFound from '../Pages/NotFound';


function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Chat />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default App;