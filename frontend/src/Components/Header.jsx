import { Button, Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AuthButton = () => {
    return (
        <Button>Выйти</Button>
    );
};

const Header = () => {
    return (
        <Navbar bg="white" expand="lg" className="shadow-sm">
            <Container>
                <Navbar.Brand as={Link} to='/'>Chat</Navbar.Brand>
                <AuthButton />
            </Container>
        </Navbar>
    );
};

export default Header;