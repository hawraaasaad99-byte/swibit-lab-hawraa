import { useState } from 'react'; 
import { Alert } from 'react-native'; 
import { useRouter } from 'expo-router'; 
import { useAuthStore } from '@/core/store/authStore'; 
import { loginApi } from '../api/loginApi';



export function useLogin() {
   const router = useRouter(); 
   const setToken = useAuthStore((state: any) => state.setToken);
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
    router.replace('/tasks' as any);
  }
} catch (error: any) {
  Alert.alert('Error', error.message || 'Failed to connect to the server');
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