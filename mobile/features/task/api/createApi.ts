import axios from 'axios'; 
import * as SecureStore from 'expo-secure-store';
const API_BASE_URL = 'http://localhost:8000';
export async function createApi(taskData:
     { title: string; description?: string; completed?: boolean }) {
         const token = await SecureStore.getItemAsync('userToken');
const response = await axios.post(`${API_BASE_URL}/tasks/`, taskData, {
     headers: { 
        'Authorization':` Bearer ${token}`
     } 
    } 
); 
 return response.data; 
}