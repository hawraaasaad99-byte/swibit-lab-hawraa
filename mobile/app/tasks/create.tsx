import React from 'react'; 
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, ActivityIndicator }
 from 'react-native'; import { Ionicons } from '@expo/vector-icons'; 
 import { useCreateTask } from '../../features/task/hooks/useCreateTask';
export default function CreateTaskScreen()
 { const { title, setTitle, description, setDescription, loading, handleCreateTask, router, } = useCreateTask();
return ( <SafeAreaView style={styles.container}> 
<View style={styles.headerRow}> 
  <TouchableOpacity style={styles.backButton} 
  onPress={() => router.back()}> 
  <Ionicons name="chevron-back" size={24} color="#000" />
   </TouchableOpacity> <Text style={styles.headerTitle}>New Task</Text>
    <View style={{ width: 40 }} />
     </View>
  <View style={styles.form}>
    <Text style={styles.label}>Task Title</Text>
    <TextInput
      style={styles.input}
      placeholder="Enter task title..."
      placeholderTextColor="#888"
      value={title}
      onChangeText={setTitle}
    />

    <Text style={styles.label}>Description</Text>
    <TextInput
      style={[styles.input, styles.textArea]}
      placeholder="Enter task details..."
      placeholderTextColor="#888"
      value={description}
      onChangeText={setDescription}
      multiline
      numberOfLines={4}
    />

    <TouchableOpacity 
      style={styles.createButton} 
      onPress={handleCreateTask}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.createButtonText}>Create Task</Text>
      )}
    </TouchableOpacity>
  </View>
</SafeAreaView>
); }
const styles = StyleSheet.create({ 
  container: { flex: 1, backgroundColor: '#fff',
     paddingHorizontal: 24, paddingVertical: 20, },
     
     headerRow: { flexDirection: 'row', justifyContent: 'space-between', 
      alignItems: 'center', marginBottom: 30, }, 
      backButton: { width: 40, height: 40, borderRadius: 20,
         backgroundColor: '#f2f2f2', 
         justifyContent: 'center', alignItems: 'center', }, 
         headerTitle: { fontSize: 20, 
          fontWeight: 'bold', color: '#333', },
           form: { flex: 1, }, 
           label: { fontSize: 15, fontWeight: '600', color: '#333',
             marginBottom: 8, },
              input: { width: '100%', height: 52, borderWidth: 1, borderColor: '#ddd', 
                borderRadius: 12, paddingHorizontal: 16, fontSize: 15, 
                backgroundColor: '#fff', marginBottom: 20, }, 
                textArea: { height: 120, textAlignVertical: 'top', 
                  paddingTop: 14, }, createButton: { width: '100%', height: 50, 
                    backgroundColor: '#344955', borderRadius: 25, 
                    justifyContent: 'center', 
                    alignItems: 'center', marginTop: 10, },
                     createButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold', letterSpacing: 1, }, });