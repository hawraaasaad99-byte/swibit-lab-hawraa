import React from 'react'; 
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, }
 from 'react-native'; import { useTasks } from '../features/task/hooks/useTasks';
export default function TasksScreen() { const { filteredTasks, filter, setFilter, title, setTitle, description, setDescription, editingTaskId, setEditingTaskId, editTitle, setEditTitle, editDescription, setEditDescription, handleAddTask, handleToggleTask, handleStartEdit, handleSaveEdit, handleDeleteTask, } = useTasks();
return ( <View style={styles.container}> <Text style={styles.headerTitle}>My Tasks</Text> <Text style={styles.dateText}>Keep track of your daily goals</Text>
  <View style={styles.inputContainer}>
    <TextInput
      style={styles.input}
      placeholder="Task title..."
      placeholderTextColor="#aaa"
      value={title}
      onChangeText={setTitle}
    />
    <TextInput
      style={styles.input}
      placeholder="Description (optional)..."
      placeholderTextColor="#aaa"
      value={description}
      onChangeText={setDescription}
    />
    <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
      <Text style={styles.addButtonText}>Add Task</Text>
    </TouchableOpacity>
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
    {filteredTasks.map((task : any) => (
      <View key={task.id} style={styles.taskItem}>
        {editingTaskId === task.id ? (
          <View style={styles.editContainer}>
            <TextInput
              style={styles.input}
              value={editTitle}
              onChangeText={setEditTitle}
            />
            <TextInput
              style={styles.input}
              value={editDescription}
              onChangeText={setEditDescription}
            />
            <View style={styles.editButtonsRow}>
              <TouchableOpacity style={styles.saveButton} onPress={() => handleSaveEdit(task)}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setEditingTaskId(null)}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <>
            <TouchableOpacity
              onPress={() => handleToggleTask(task)}
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
              <TouchableOpacity onPress={() => handleStartEdit(task)} style={styles.actionBtn}>
                <Text style={styles.editText}>✏️</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteTask(task.id)} style={styles.actionBtn}>
                <Text style={styles.deleteText}>❌</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    ))}
  </ScrollView>
</View>
); }
const styles = StyleSheet.
create({ container: { flex: 1, padding: 20, backgroundColor: '#fff', }, headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#000', }, dateText: { fontSize: 14, color: '#666', marginBottom: 15, }, filterContainer: { flexDirection: 'row', backgroundColor: '#f1f1f1', borderRadius: 8, padding: 4, marginBottom: 20, }, filterButton: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: 6, }, activeFilterButton: { backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 1, elevation: 2, }, filterText: { fontSize: 13, color: '#666', fontWeight: '500', }, activeFilterText: { color: '#000', fontWeight: 'bold', }, inputContainer: { marginBottom: 20, }, input: { borderWidth: 1, borderColor: '#e0e0e0', backgroundColor: '#fafafa', padding: 12, borderRadius: 8, marginBottom: 10, color: '#000', }, addButton: { backgroundColor: '#000', padding: 12, borderRadius: 8, alignItems: 'center', }, addButtonText: { color: '#fff', fontWeight: 'bold', }, scrollContainer: { paddingBottom: 20, }, taskItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f0f0f0', justifyContent: 'space-between', }, circle: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: '#999', marginRight: 12, }, completedCircle: { backgroundColor: '#28a745', borderColor: '#28a745', }, taskTextContainer: { flex: 1, }, taskTitle: { fontSize: 16, color: '#333', }, completedText: { textDecorationLine: 'line-through', color: '#aaa', }, taskDescription: { fontSize: 13, color: '#777', marginTop: 3, }, actionButtons: { flexDirection: 'row', alignItems: 'center', }, actionBtn: { marginLeft: 10, }, editText: { fontSize: 14, }, deleteText: { fontSize: 14, }, editContainer: { flex: 1, paddingRight: 10, }, editButtonsRow: { flexDirection: 'row', justifyContent: 'flex-end', }, saveButton: { backgroundColor: '#000', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6, marginRight: 8, }, saveButtonText: { color: '#fff', fontSize: 12, fontWeight: 'bold', }, cancelButton: { backgroundColor: '#ccc', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6, }, cancelButtonText: { color: '#333', fontSize: 12, fontWeight: 'bold', }, });