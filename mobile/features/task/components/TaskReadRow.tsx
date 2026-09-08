import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { tasks } from '@/core/types';

export function TaskReadRow({
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

const styles = StyleSheet.create({
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
});