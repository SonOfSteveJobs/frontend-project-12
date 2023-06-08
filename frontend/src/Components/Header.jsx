import { Button, Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {useContext} from 'react';
import {AuthContext} from '../context';

const Header = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);
    const onLogout = () => {
        setIsAuth(false);
        localStorage.removeItem('userToken');
    }
    return (
        <Navbar bg="white" expand="lg" className="shadow-sm">
            <Container>
                <Navbar.Brand as={Link} to='/'>Chat</Navbar.Brand>
                {isAuth && <Button onClick={onLogout}>Выйти</Button>}
            </Container>
        </Navbar>
    );
};

export default Header;