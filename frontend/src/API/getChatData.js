import axios from 'axios';

const getChatData = async (authHeader, setResponse) => {
    const response = await axios.get(('/api/v1/data'), {headers: authHeader});
    setResponse(response)
};

export default getChatData;