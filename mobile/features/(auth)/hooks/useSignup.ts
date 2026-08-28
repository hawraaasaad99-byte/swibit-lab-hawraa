import { useState } from 'react';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { signupApi } from '../api/signupApi';

export function useSigup(){
    const router = useRouter();


const [username, setUsername] = useState('');
 const [email, setEmail] = useState(''); 
 const [password, setPassword] = useState(''); 
 const [loading, setLoading] = useState(false);
const handleSignup = async () =>
     { if (!username || !email || !password)
     { Alert.alert('Notice', 'Please fill in all required fields'); 
        return; }
setLoading(true);

try {
  await signupApi({ username, email, password });

  Alert.alert('Success', 'Account created successfully!');
  router.replace('/login' as any);
} catch (error: any) {
  Alert.alert('Error', error.message || 'Failed to connect to the server');
} finally {
  setLoading(false);
}
};
return { username, setUsername, email, setEmail, password, setPassword, loading, handleSignup, router, };
}