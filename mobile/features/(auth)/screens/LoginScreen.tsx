import React from 'react';
import { useLogin } from '../hooks/useLogin';
import { Field } from '@/shared/components/field';
import { SubmitButton } from '@/shared/components/submitbutton';
import { AuthLayout } from '../components/AuthLayout';

export default function LoginScreen() {
  const { email, setEmail, password, setPassword, loading, handleLogin, router } = useLogin();

  return (
    <AuthLayout
      title="Log-in"
      switchQuestion="Don't have an account ?"
      switchActionText="Sign-up"
      onSwitchPress={() => router.push('/signup')}
    >
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
      <SubmitButton loading={loading} label="Login" onPress={handleLogin} />
    </AuthLayout>
  );
}