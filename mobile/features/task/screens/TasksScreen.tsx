import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useTasks } from '../hooks/useTasks';
import { useAddTask } from '../hooks/useAddTask';
import { useUpdateTask } from '../hooks/useUpdateTask';
import { useTaskEditing } from '../hooks/useTaskEditing';
import { useDeleteTask } from '../hooks/useDeleteTask';
import { Field } from '@/shared/components/field';
import { SubmitButton } from '@/shared/components/submitbutton';
import { tasks } from '@/core/types';
import { TaskReadRow } from '../components/TaskReadRow';
import { TaskEditRow } from '../components/TaskEditRow';

export default function TasksScreen() {
  const { filteredTasks, filter, setFilter } = useTasks();
  const { title, setTitle, description, setDescription, handleAddTask } = useAddTask();
  const { handleToggleTask } = useUpdateTask();
  const {
    editingTaskId, setEditingTaskId,
    editTitle, setEditTitle, editDescription, setEditDescription,
    handleStartEdit, handleSaveEdit,
  } = useTaskEditing();
  const { handleDeleteTask } = useDeleteTask();

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>My Tasks</Text>
      <Text style={styles.dateText}>Keep track of your daily goals</Text>

      <View style={styles.inputContainer}>
        <Field label="Task Title" placeholder="Task title..." value={title} onChangeText={setTitle} />
        <Field label="Description" placeholder="Description (optional)..." value={description} onChangeText={setDescription} />
        <SubmitButton loading={false} label="Add Task" onPress={handleAddTask} />
      </View>

      <View style={styles.filterContainer}>
        {(['all', 'active', 'completed'] as const).map((f) => (
          <TouchableOpacity key={f} style={[styles.filterButton, filter === f && styles.activeFilterButton]} onPress={() => setFilter(f)}>
            <Text style={[styles.filterText, filter === f && styles.activeFilterText]}>{f.charAt(0).toUpperCase() + f.slice(1)}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {filteredTasks.map((task: tasks) =>
          editingTaskId === task.id ? (
            <TaskEditRow
              key={task.id}
              editTitle={editTitle}
              setEditTitle={setEditTitle}
              editDescription={editDescription}
              setEditDescription={setEditDescription}
              onSave={() => handleSaveEdit(task)}
              onCancel={() => setEditingTaskId(null)}
            />
          ) : (
            <TaskReadRow
              key={task.id}
              task={task}
              onToggle={handleToggleTask}
              onStartEdit={handleStartEdit}
              onDelete={handleDeleteTask}
            />
          )
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#000' },
  dateText: { fontSize: 14, color: '#666', marginBottom: 15 },
  filterContainer: { flexDirection: 'row', backgroundColor: '#f1f1f1', borderRadius: 8, padding: 4, marginBottom: 20 },
  filterButton: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: 6 },
  activeFilterButton: { backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 1, elevation: 2 },
  filterText: { fontSize: 13, color: '#666', fontWeight: '500' },
  activeFilterText: { color: '#000', fontWeight: 'bold' },
  inputContainer: { marginBottom: 20 },
  scrollContainer: { paddingBottom: 20 },
});