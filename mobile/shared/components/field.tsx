import React from 'react';
import { View, Text, TextInput, TextInputProps, StyleSheet } from 'react-native';

interface FieldProps extends TextInputProps {
  label: string;
}

export function Field({ label, ...inputProps }: FieldProps) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor="#aaa"
        {...inputProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 6,
    fontWeight: '600',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
});