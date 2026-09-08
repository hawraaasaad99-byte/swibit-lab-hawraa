import React from 'react';
import { useSigup } from '../hooks/useSignup';
import { Field } from '@/shared/components/field';
import { SubmitButton } from '@/shared/components/submitbutton';
import { AuthLayout } from '../components/AuthLayout';

export default function SignupScreen() {
  const { username, setUsername, email, setEmail, password, setPassword, loading, handleSignup, router } = useSigup();

  return (
    <AuthLayout
      title="Sign-up"
      switchQuestion="Already have an account ?"
      switchActionText="Login"
      onSwitchPress={() => router.push('/login')}
    >
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
      <SubmitButton loading={loading} label="Sign Up" onPress={handleSignup} />
    </AuthLayout>
  );
}