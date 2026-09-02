import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useSigup } from '../features/(auth)/hooks/useSignup';
import { Field } from '@/shared/components/field';
import { SubmitButton } from '@/shared/components/submitbutton';

export default function SignupScreen() {
  const { username, setUsername, email, setEmail, password, setPassword, loading, handleSignup, router, } = useSigup();

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.formWrapper}>
          <Text style={styles.headerTitle}>Sign-up</Text>

          <Field
            label="Username"
            placeholder="Your username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />

          <Field
            label="Email"
            placeholder="Your email id"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Field
            label="Password"
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <SubmitButton
            loading={loading}
            label="Sign Up"
            onPress={handleSignup}
          />

          <View style={styles.switchContainer}>
            <Text style={styles.switchQuestion}>Already have an account ? </Text>
            <TouchableOpacity onPress={() => router.push('/login')}>
              <Text style={styles.switchActionText}>Login</Text>
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
  switchQuestion: { color: '#57606f', fontSize: 14, fontWeight: 'bold' },
  switchActionText: { color: '#2f3640', fontSize: 14, fontWeight: 'bold' },
});