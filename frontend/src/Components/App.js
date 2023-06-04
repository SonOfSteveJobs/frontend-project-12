import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import routes from './routes'
import Header from './Header';
import NotFound from '../Pages/NotFound';
import Chat from '../Pages/Chat';
import Login from '../Pages/Login';
import SignUpForm from '../Pages/SignUpForm';

function App() {
    return (
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
    );
}

export default App;