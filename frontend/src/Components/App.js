import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Header from './Header';
import NotFound from '../Pages/NotFound';
import Chat from '../Pages/Chat';
import Login from '../Pages/Login';
import SignUpForm from '../Pages/SignUpForm';
import {AuthContext} from '../context';

function App() {
    const [isAuth, setIsAuth] = useState(false);
    return (
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth,
        }}>
            <div className="h-100">
                <div className="d-flex flex-column h-100">
                    <Router>
                        <Header />
                        <Routes>
                            <Route path='/' element={(<Chat />)}/>
                            <Route path='/login' element={<Login />} />
                            <Route path='/signup' element={<SignUpForm />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Router>
                </div>
            </div>
        </AuthContext.Provider>
    );
}

export default App;