import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';

export function TaskEditRow({
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

const styles = StyleSheet.create({
  taskItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f0f0f0', justifyContent: 'space-between' },
  editContainer: { flexDirection: 'column', alignItems: 'stretch' },
  input: { borderWidth: 1, borderColor: '#e0e0e0', backgroundColor: '#fafafa', padding: 12, borderRadius: 8, marginBottom: 10, color: '#000' },
  editButtonsRow: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 5 },
  saveButton: { backgroundColor: '#000', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6, marginRight: 8 },
  saveButtonText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  cancelButton: { backgroundColor: '#ccc', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6 },
  cancelButtonText: { color: '#333', fontSize: 12, fontWeight: 'bold' },
});