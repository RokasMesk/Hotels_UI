import axios from 'axios';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
export const getHotels = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/Hotel`);
        return response.data;
    } catch(error){
        console.error('Error while fetching hotels: ', error);
        throw error;
    }

};