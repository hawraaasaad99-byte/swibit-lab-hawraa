import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useLogin } from '../features/(auth)/hooks/useLogin';
import { Field } from '@/shared/components/field';
import { SubmitButton } from '@/shared/components/submitbutton';

export default function LoginScreen() {
  const { email, setEmail, password, setPassword, loading, handleLogin, router, } = useLogin();

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.formWrapper}>
          <Text style={styles.headerTitle}>Log-in</Text>

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
            label="Login"
            onPress={handleLogin}
          />

          <View style={styles.switchContainer}>
            <Text style={styles.switchQuestion}>Don't have an account ? </Text>
            <TouchableOpacity onPress={() => router.push('/signup')}>
              <Text style={styles.switchActionText}>Sign-up</Text>
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