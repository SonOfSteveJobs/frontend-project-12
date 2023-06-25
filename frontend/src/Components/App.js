import 'bootstrap/dist/css/bootstrap.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from '../hooks/useAuth';
import Chat from '../Pages/Chat';
import Login from '../Pages/Login';
import NotFound from '../Pages/NotFound';
import SignUp from '../Pages/SignUp';
import routes from '../routes/routes';
import Header from './Header';

const App = () => (
  <AuthProvider>
    <div className="h-100">
      <div className="d-flex flex-column h-100">
        <Router>
          <Header />
          <Routes>
            <Route path={routes.chatPage()} element={(<Chat />)} />
            <Route path={routes.loginPage()} element={<Login />} />
            <Route path={routes.signupPage()} element={<SignUp />} />
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

export default App;
