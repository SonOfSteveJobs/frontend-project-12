import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Header from './Header';
import NotFound from '../Pages/NotFound';
import Chat from '../Pages/Chat';
import Login from '../Pages/Login';
import SignUp from '../Pages/SignUp';
import { AuthProvider } from '../hooks/useAuth';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <AuthProvider>
            <div className="h-100">
                <div className="d-flex flex-column h-100">
                    <Router>
                        <Header />
                        <Routes>
                            <Route path='/' element={(<Chat />)}/>
                            <Route path='/login' element={<Login />} />
                            <Route path='/signup' element={<SignUp />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Router>
                </div>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </div>
        </AuthProvider>
    );
}

export default App;
