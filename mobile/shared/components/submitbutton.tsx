import React from 'react';
import { Pressable, Text, ActivityIndicator, StyleSheet } from 'react-native';

interface SubmitButtonProps {
  loading: boolean;
  label: string;
  onPress: () => void;
}

export function SubmitButton({ loading, label, onPress }: SubmitButtonProps) {
  return (
    <Pressable 
      style={[styles.button, loading && styles.disabledButton]} 
      onPress={onPress} 
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.buttonText}>{label}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#737475',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  disabledButton: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});