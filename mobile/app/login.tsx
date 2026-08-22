import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import {api} from '../lib/api'; 

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      
      
      const response = await api.post('/login', {
        username: username,
        password: password,
      });

      
      const token = response.data.access_token || response.data.token;

      if (token) {
        // حفظ الـ Token باستخدام expo-secure-store
        await SecureStore.setItemAsync('userToken', token);
        
        Alert.alert('Success', 'Logged in successfully!');
        
        
        router.replace('/(tabs)'); 
      } else {
        Alert.alert('Error', 'Token not received from server');
      }
    } catch (error: any) {
      console.error(error);
      Alert.alert('Login Failed', error.response?.data?.detail || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center px-6 bg-white">
      <Text className="text-3xl font-bold text-center mb-8 text-gray-800">Welcome Back</Text>
      
      <TextInput
        className="w-full h-12 border border-gray-300 rounded-lg px-4 mb-4 bg-gray-50 text-black"
        placeholder="Username"
        placeholderTextColor="#9ca3af"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      <TextInput
        className="w-full h-12 border border-gray-300 rounded-lg px-4 mb-6 bg-gray-50 text-black"
        placeholder="Password"
        placeholderTextColor="#9ca3af"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        className={`w-full h-12 rounded-lg justify-center items-center ${loading ? 'bg-blue-300' : 'bg-blue-600'}`}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text className="text-white font-semibold text-lg">
          {loading ? 'Logging in...' : 'Login'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}