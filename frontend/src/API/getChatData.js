import axios from 'axios';
import getAuthHeader from './getAuthHeader';
import {toast} from 'react-toastify';
import {t} from 'i18next';
import routes from '../routes/routes';

const getChatData = async () => {
    const authHeader = getAuthHeader();
    try {
        const response = await axios.get((routes.data), {headers: authHeader})
        return response.data;
    } catch (e) {
        toast.error(t('notifications.аuthError'));
        console.error(e);
    }

};

export default getChatData;
