import { useAuthStore } from '../core/store/authStore';
beforeEach(() => { useAuthStore.setState({ token: null, isAuthenticated: false }); });
describe('Auth Store Tests', () => { it('should initialize with default unauthenticated state', () => { 
    const state = useAuthStore.getState();
     expect(state.token).toBeNull(); 
     expect(state.isAuthenticated).toBeFalsy(); });
it('should successfully set token and authenticate user on login', () => {
     const fakeToken = 'mock-jwt-token-123';
useAuthStore.getState().setToken(fakeToken);

const state = useAuthStore.getState();
expect(state.token).toBe(fakeToken);
});
it('should clear token and state on logout', () => { 
    useAuthStore.setState({ token: 'some-token', isAuthenticated: true });
useAuthStore.getState().logout();

const state = useAuthStore.getState();
expect(state.token).toBeNull();
expect(state.isAuthenticated).toBeFalsy();
}); });