import { createContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types/user.type';
import { getToken, getUser, clearSession } from '../utils/storage';

interface AuthContextValue {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    updateSession: () => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextValue>({
    user: null,
    token: null,
    isLoading: false,
    updateSession: () => { },
    logout: () => { },
});

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const updateSession = () => {
        const t = getToken();
        const u = getUser<User>();
        setToken(t);
        setUser(u);
        setIsLoading(false);
    };

    const logout = () => {
        clearSession();
        setToken(null);
        setUser(null);
    };

    useEffect(() => {
        updateSession();
    }, []);

    return (
        <AuthContext.Provider value={{ user, token, isLoading, updateSession, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
