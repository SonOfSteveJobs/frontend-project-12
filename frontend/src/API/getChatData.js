import axios from 'axios';
import getAuthHeader from './getAuthHeader';
import {toast} from 'react-toastify';
import {t} from 'i18next';

const getChatData = async () => {
    const authHeader = getAuthHeader();
    try {
        const response = await axios.get(('/api/v1/data'), {headers: authHeader})
        return response.data;
    } catch (e) {
        toast.error(t('notifications.аuthError'));
        console.error(e);
    }

};

export default getChatData;
