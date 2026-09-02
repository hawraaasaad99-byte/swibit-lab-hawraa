import { useState } from 'react'; 
import { Alert } from 'react-native'; 
import { useRouter } from 'expo-router'; 
import { useAuthStore } from '@/core/store/authStore'; 
import { loginApi } from '../api/loginApi';
import axios from 'axios';
import { tasks} from '@/core/types';




export function useLogin() {
   const router = useRouter(); 
   const setToken = useAuthStore((state) => state.setToken);
const [email, setEmail] = useState('');
 const [password, setPassword] = useState(''); 
 const [loading, setLoading] = useState(false);
const handleLogin = async () => {
   if (!email || !password)
     { Alert.alert('Notice', 'Please fill in all required fields'); 
  return; }
setLoading(true);

try {
  const data = await loginApi(email, password);
console.log

  if (data.access_token) {
    setToken(data.access_token);
    router.replace('/tasks');
  }
} catch (error: unknown){
  if (axios.isAxiosError(error)) {
    console.log(error.response?.data?.message);
  } else{
    console.log('an unexpected error occurred');
  }

} finally {
  setLoading(false);
}
};
return {
   email, 
   setEmail, 
   password,
    setPassword,
     loading,
      handleLogin,
       router, }; }