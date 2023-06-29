import axios from 'axios';
import routes from '../routes/routes';
import getAuthHeader from './getAuthHeader';

const getChatData = async () => {
  const authHeader = getAuthHeader();
  const response = await axios.get((routes.data()), { headers: authHeader });
  return response.data;
};

export default getChatData;
