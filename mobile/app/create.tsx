import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';

export default function CreateTaskScreen() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleCreateTask = async () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert('Error', 'Please fill in both title and description');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      console.log("Token being sent:", token);

      const response = await axios.post(
        'http://localhost:8000/tasks/', 
        { title, description },
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          } 
        }
      );

      console.log("Task created successfully:", response.data);
      Alert.alert('Success', 'Task created successfully!');
      (router.replace as any)('/tasks');
    } catch (error: any) {
      console.error("Create Task Error:", error.response || error);
      const errorMessage = error.response?.data?.detail || 'Failed to create task';
      Alert.alert('Error', errorMessage);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Create New Task</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Task Title"
        placeholderTextColor="#888"
        value={title}
        onChangeText={(text: string) => setTitle(text)}
      />
      
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Task Description"
        placeholderTextColor="#888"
        value={description}
        onChangeText={(text: string) => setDescription(text)}
        multiline={true}
      />

      <TouchableOpacity style={styles.button} onPress={handleCreateTask}>
        <Text style={styles.buttonText}>CREATE</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 24, 
    justifyContent: 'center', 
    backgroundColor: '#fff' 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 24, 
    color: '#333', 
    textAlign: 'center' 
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#ddd', 
    borderRadius: 12, 
    padding: 16, 
    marginBottom: 16, 
    fontSize: 16, 
    backgroundColor: '#fff' 
  },
  button: { 
    backgroundColor: '#344955', 
    height: 52, 
    borderRadius: 26, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 10 
  },
  buttonText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
})