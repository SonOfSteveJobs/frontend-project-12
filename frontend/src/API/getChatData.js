import axios from 'axios';

const getChatData = async (authHeader) => {
    const response = await axios.get(('/api/v1/data'), {headers: authHeader});
    console.log(response);
};

export default getChatData();