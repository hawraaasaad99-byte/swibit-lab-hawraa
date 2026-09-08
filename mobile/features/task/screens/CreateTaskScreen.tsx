import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCreateTask } from '../hooks/useCreateTask';
import { Field } from '@/shared/components/field';
import { SubmitButton } from '@/shared/components/submitbutton';

export default function CreateTaskScreen() {
  const { title, setTitle, description, setDescription, loading, handleCreateTask, router, } = useCreateTask();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Task</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.form}>
        <Field
          label="Task Title"
          placeholder="Enter task title..."
          value={title}
          onChangeText={setTitle}
        />

        <Field
          label="Description"
          placeholder="Enter task details..."
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
          style={[styles.input, styles.textArea]}
        />

        <SubmitButton
          loading={loading}
          label="Create Task"
          onPress={handleCreateTask}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 24, paddingVertical: 20 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 },
  backButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#f2f2f2', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  form: { flex: 1 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 12, paddingHorizontal: 16, fontSize: 15, backgroundColor: '#fff' },
  textArea: { height: 120, textAlignVertical: 'top', paddingTop: 14 },
});