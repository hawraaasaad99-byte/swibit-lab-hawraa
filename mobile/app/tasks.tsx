import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useTasks } from '../features/task/hooks/useTasks';
import { Field } from '@/shared/components/field';
import { SubmitButton } from '@/shared/components/submitbutton';
import { tasks } from '@/core/types';

function TaskReadRow({ 
  task, 
  onToggle, 
  onStartEdit, 
  onDelete 
}: { 
  task: tasks; 
  onToggle: (t: tasks) => void; 
  onStartEdit: (t: tasks) => void; 
  onDelete: (id: number) => void; 
}) {
  return (
    <View style={styles.taskItem}>
      <TouchableOpacity
        onPress={() => onToggle(task)}
        style={[styles.circle, task.completed && styles.completedCircle]}
      />
      <View style={styles.taskTextContainer}>
        <Text style={[styles.taskTitle, task.completed && styles.completedText]}>
          {task.title}
        </Text>
        {task.description && (
          <Text style={styles.taskDescription}>{task.description}</Text>
        )}
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity onPress={() => onStartEdit(task)} style={styles.actionBtn}>
          <Text style={styles.editText}>✏️</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(task.id as number)} style={styles.actionBtn}>
          <Text style={styles.deleteText}>❌</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function TaskEditRow({ 
  editTitle, 
  setEditTitle, 
  editDescription, 
  setEditDescription, 
  onSave, 
  onCancel 
}: { 
  editTitle: string; 
  setEditTitle: (val: string) => void; 
  editDescription: string; 
  setEditDescription: (val: string) => void; 
  onSave: () => void; 
  onCancel: () => void; 
}) {
  return (
    <View style={[styles.taskItem, styles.editContainer]}>
      <TextInput
        style={styles.input}
        value={editTitle}
        onChangeText={setEditTitle}
        placeholder="Edit title..."
      />
      <TextInput
        style={styles.input}
        value={editDescription}
        onChangeText={setEditDescription}
        placeholder="Edit description..."
      />
      <View style={styles.editButtonsRow}>
        <TouchableOpacity style={styles.saveButton} onPress={onSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function TasksScreen() {
  const { 
    filteredTasks, filter, setFilter, 
    title, setTitle, description, setDescription, 
    editingTaskId, setEditingTaskId, 
    editTitle, setEditTitle, editDescription, setEditDescription, 
    handleAddTask, handleToggleTask, handleStartEdit, handleSaveEdit, handleDeleteTask 
  } = useTasks();

  return (
    <View style={styles.container}> 
      <Text style={styles.headerTitle}>My Tasks</Text> 
      <Text style={styles.dateText}>Keep track of your daily goals</Text>
      
      <View style={styles.inputContainer}>
        <Field
          label="Task Title"
          placeholder="Task title..."
          value={title}
          onChangeText={setTitle}
        />
        <Field
          label="Description"
          placeholder="Description (optional)..."
          value={description}
          onChangeText={setDescription}
        />
        <SubmitButton
          loading={false}
          label="Add Task"
          onPress={handleAddTask}
        />
      </View>

      <View style={styles.filterContainer}>
        {(['all', 'active', 'completed'] as const).map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.filterButton, filter === f && styles.activeFilterButton]}
            onPress={() => setFilter(f)}
          >
            <Text style={[styles.filterText, filter === f && styles.activeFilterText]}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {filteredTasks.map((task: tasks) => (
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
        ))}
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
  input: { borderWidth: 1, borderColor: '#e0e0e0', backgroundColor: '#fafafa', padding: 12, borderRadius: 8, marginBottom: 10, color: '#000' },
  scrollContainer: { paddingBottom: 20 },
  taskItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f0f0f0', justifyContent: 'space-between' },
  circle: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: '#999', marginRight: 12 },
  completedCircle: { backgroundColor: '#28a745', borderColor: '#28a745' },
  taskTextContainer: { flex: 1 },
  taskTitle: { fontSize: 16, color: '#333' },
  completedText: { textDecorationLine: 'line-through', color: '#aaa' },
  taskDescription: { fontSize: 13, color: '#777', marginTop: 3 },
  actionButtons: { flexDirection: 'row', alignItems: 'center' },
  actionBtn: { marginLeft: 10 },
  editText: { fontSize: 14 },
  deleteText: { fontSize: 14 },
  editContainer: { flexDirection: 'column', alignItems: 'stretch' },
  editButtonsRow: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 5 },
  saveButton: { backgroundColor: '#000', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6, marginRight: 8 },
  saveButtonText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  cancelButton: { backgroundColor: '#ccc', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6 },
  cancelButtonText: { color: '#333', fontSize: 12, fontWeight: 'bold' },
});