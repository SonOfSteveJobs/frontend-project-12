import axios from 'axios';
import getAuthHeader from './getAuthHeader';

const getChatData = async () => {
    const authHeader = getAuthHeader();
    const response = await axios.get(('/api/v1/data'), {headers: authHeader});
    return response.data;
};

export default getChatData;