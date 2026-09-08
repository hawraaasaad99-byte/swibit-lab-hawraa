import { Stack, Redirect } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthStore } from '../core/store/authStore';

const queryClient = new QueryClient();

export default function RootLayout() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <QueryClientProvider client={queryClient}>
      {isAuthenticated ? (
        <Redirect href="/(tabs)/home" />
      ) : (
        <Redirect href="/login" />
      )}
      <Stack screenOptions={{ headerShown: false }} />
    </QueryClientProvider>
  );
}