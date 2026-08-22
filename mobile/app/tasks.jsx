import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';

export default function TasksScreen() {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      console.log("Fetching tasks... Token:", token);

      const response = await axios.get('http://localhost:8000/tasks/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      console.log("Tasks data received:", response.data);
      setTasks(response.data || []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      Alert.alert('Error', 'Could not load tasks');
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8000/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      Alert.alert('Error', 'Failed to delete task.');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Tasks</Text>
        <TouchableOpacity onPress={() => (router.replace )('/')}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.createButton} onPress={() => (router.push )('/create')}>
        <Text style={styles.createButtonText}>+ Create New Task</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.refreshButton} onPress={fetchTasks}>
        <Text style={styles.refreshButtonText}>🔄 Refresh Tasks</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#344955" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={<Text style={styles.emptyText}>No tasks found. Create one!</Text>}
          renderItem={({ item }) => (
            <View style={styles.taskCard}>
              <View style={{ flex: 1 }}>
                <Text style={styles.taskTitle}>{item.title}</Text>
                <Text style={styles.taskDesc}>{item.description}</Text>
              </View>
              
              <TouchableOpacity onPress={() => (router.push )(`/edit?id=${item.id}`)} style={{ marginRight: 15 }}>
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => deleteTask(item.id)}>
                <Text style={styles.deleteText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 24, paddingTop: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  logoutText: { color: '#d9534f', fontWeight: 'bold' },
  createButton: { backgroundColor: '#344955', padding: 14, borderRadius: 12, alignItems: 'center', marginBottom: 10 },
  createButtonText: { color: '#fff', fontWeight: 'bold' },
  refreshButton: { backgroundColor: '#f0f0f0', padding: 10, borderRadius: 8, alignItems: 'center', marginBottom: 20 },
  refreshButtonText: { color: '#333', fontWeight: 'bold' },
  taskCard: { flexDirection: 'row', padding: 16, backgroundColor: '#f9f9f9', borderRadius: 12, marginBottom: 12, alignItems: 'center' },
  taskTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  taskDesc: { fontSize: 14, color: '#666', marginTop: 4 },
  editText: { color: '#3498db', fontWeight: 'bold' },
  deleteText: { color: '#d9534f', fontWeight: 'bold' },
  emptyText: { textAlign: 'center', color: '#888', marginTop: 40, fontSize: 16 }
});