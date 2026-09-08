import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

export function AuthLayout({
  title,
  children,
  switchQuestion,
  switchActionText,
  onSwitchPress,
}: {
  title: string;
  children: React.ReactNode;
  switchQuestion: string;
  switchActionText: string;
  onSwitchPress: () => void;
}) {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.formWrapper}>
          <Text style={styles.headerTitle}>{title}</Text>

          {children}

          <View style={styles.switchContainer}>
            <Text style={styles.switchQuestion}>{switchQuestion} </Text>
            <TouchableOpacity onPress={onSwitchPress}>
              <Text style={styles.switchActionText}>{switchActionText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  scrollContainer: { flexGrow: 1, paddingHorizontal: 28, paddingVertical: 40, justifyContent: 'center' },
  formWrapper: { width: '100%' },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#111', marginBottom: 24 },
  switchContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20 },
  switchQuestion: { color: '#57606f', fontSize: 14 },
  switchActionText: { color: '#2f3640', fontSize: 14, fontWeight: 'bold' },
});