import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { authService } from '../services/auth';

const token = ref<string | null>(localStorage.getItem('token'));
const isLoading = ref(false);
const error = ref<string | null>(null);

export function useAuth() {
    const router = useRouter();
    const isAuthenticated = computed(() => !!token.value);

    const setToken = (newToken: string | null) => {
        token.value = newToken;
        if (newToken) {
            localStorage.setItem('token', newToken);
        } else {
            localStorage.removeItem('token');
        }
    };

    const login = async (email: string, password: string) => {
        try {
            isLoading.value = true;
            error.value = null;
            const newToken = await authService.login({ email, password });
            setToken(newToken);
            router.push('/reports');
        } catch (e) {
            error.value = 'Credenciales inválidas';
            throw e;
        } finally {
            isLoading.value = false;
        }
    };

    const logout = async () => {
        try {
            if (token.value) {
                await authService.logout();
            }
        } catch (e) {
            console.error('Error during logout:', e);
        } finally {
            setToken(null);
            router.push('/login');
        }
    };

    const verifyToken = async () => {
        try {
            if (token.value) {
                const isValid = await authService.verifyToken(token.value);
                if (!isValid) {
                    logout();
                }
            }
        } catch (e) {
            console.error('Error during token verification:', e);
        }
    };

    return {
        token,
        isLoading,
        error,
        isAuthenticated,
        login,
        logout,
        verifyToken
    };
}
