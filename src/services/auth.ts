import type { AuthResponse, LoginCredentials } from "../types/Auth";
import { api } from "./api";

export const authService = {
    async login(credentials: LoginCredentials): Promise<string> {
        const { data } = await api.post<AuthResponse>('/login', credentials);
        return data.token;
    },

    async logout(): Promise<void> {
        await api.post('/logout', null);
    },

    async verifyToken(token: string): Promise<boolean> {
        try {

            const { status } = await api.post('/verify-token', null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (status !== 200) {
                return false;
            }
            return true;
        } catch (error) {
            return false;
        }
    }
};
