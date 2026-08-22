import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';

export default function SignupScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      // Send request to backend API to create a new user
      await axios.post('http://localhost:8000/users/', {
        email,
        password,
      });
      Alert.alert('Success', 'Account created successfully! Please login.');
      // Navigate directly back to the login screen
      (router.push as any)('/'); 
    } catch (error: any) {
      console.error(error);
      const errorMessage = error.response?.data?.detail || 'Failed to sign up';
      Alert.alert('Error', errorMessage);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>SIGN UP</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>SIGN UP</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.loginLink} 
        onPress={() => (router.push as any)('/')}
      >
        <Text style={styles.loginText}>
          Already have an account? <Text style={styles.loginBold}>Login</Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#fff', 
    paddingHorizontal: 24 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 24, 
    color: '#333',
    letterSpacing: 1,
  },
  input: { 
    width: '100%', 
    height: 52, 
    borderWidth: 1, 
    borderColor: '#ddd', 
    borderRadius: 12, 
    paddingHorizontal: 16, 
    fontSize: 15,
    backgroundColor: '#fff',
    marginBottom: 16, 
  },
  button: { 
    width: '100%', 
    height: 52, 
    backgroundColor: '#344955', 
    borderRadius: 26, 
    justifyContent: 'center', 
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  loginLink: {
    marginTop: 16,
    alignItems: 'center',
  },
  loginText: {
    color: '#666',
    fontSize: 14,
  },
  loginBold: {
    color: '#344955',
    fontWeight: 'bold',
  },
});