import axios from 'axios';
import routes from '../routes/routes';

const getChatData = async (authHeader) => {
  const response = await axios.get((routes.data()), { headers: authHeader });
  return response.data;
};

export default getChatData;
