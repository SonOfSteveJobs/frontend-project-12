import { Button, Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {useAuth} from '../hooks/useAuth';

const Header = () => {
    const { isAuth, removeToken } = useAuth();
    const onLogout = () => {
        removeToken();
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