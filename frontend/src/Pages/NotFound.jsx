import { useTranslation } from 'react-i18next';
import imagePath from '../assets/notFound.jpg';
import routes from '../routes/routes';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center h-100">
      <img alt="Страница не найдена" className="img-fluid h-35" src={imagePath} />
      <h1 className="h4 text-muted">{t('notFound.notFound')}</h1>
      <p className="text-muted">
        {t('notFound.redirect')}
        {' '}
        <a href={routes.chatPage()}>{t('notFound.mainPage')}</a>
      </p>
    </div>
  );
};

export default NotFound;
