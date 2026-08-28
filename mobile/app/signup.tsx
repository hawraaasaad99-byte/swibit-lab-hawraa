import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator, } from 'react-native';
import { useSigup } from '../features/(auth)/hooks/useSignup';
export default function SignupScreen() {
  const { username, setUsername, email, setEmail, password, setPassword, loading, handleSignup, router, } = useSigup();
  return (<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container} > <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
    <View style={styles.formWrapper}>
      <Text style={styles.headerTitle}>Sign-up</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Your username"
          placeholderTextColor="#aaa"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Your email id"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity
        style={[styles.mainButton, loading && styles.buttonDisabled]}
        onPress={handleSignup}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.mainButtonText}>Sign Up</Text>
        )}
      </TouchableOpacity>

      <View style={styles.switchContainer}>
        <Text style={styles.switchQuestion}>Already have an account ? </Text>
        <TouchableOpacity onPress={() => router.push('/login' as any)}>
          <Text style={styles.switchActionText}>Login</Text>
        </TouchableOpacity>
      </View>

    </View>
  </ScrollView>
  </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, backgroundColor: '#ffffff', }, scrollContainer: { flexGrow: 1, paddingHorizontal: 28, paddingVertical: 40, justifyContent: 'center', }, formWrapper: { width: '100%', }, headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#111', marginBottom: 24, }, inputGroup: { marginBottom: 20, }, label: { fontSize: 15, fontWeight: '600', color: '#222', marginBottom: 6, }, input: { fontSize: 14, color: '#333', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#d1d8e0', }, mainButton: { backgroundColor: '#2f3640', borderRadius: 25, paddingVertical: 14, alignItems: 'center', marginTop: 20, marginBottom: 20, }, buttonDisabled: { opacity: 0.7, }, mainButtonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold', }, switchContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }, switchQuestion: { color: '#57606f', fontSize: 14, fontWeight: 'bold', }, switchActionText: { color: '#2f3640', fontSize: 14, fontWeight: 'bold', }, });