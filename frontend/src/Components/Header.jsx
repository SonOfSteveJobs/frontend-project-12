import { Button, Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {useAuth} from '../hooks/useAuth';
import { useTranslation } from 'react-i18next';
import routes from '../routes/routes';

const Header = () => {
    const { isAuth, removeToken } = useAuth();
    const { t } = useTranslation();

    const onLogout = () => {
        removeToken();
    }
    return (
        <Navbar bg="white" expand="lg" className="shadow-sm">
            <Container>
                <Navbar.Brand as={Link} to={routes.chatPage}>{t('header.chatBtn')}</Navbar.Brand>
                {isAuth && <Button onClick={onLogout}>{t('header.exitBtn')}</Button>}
            </Container>
        </Navbar>
    );
};

export default Header;
