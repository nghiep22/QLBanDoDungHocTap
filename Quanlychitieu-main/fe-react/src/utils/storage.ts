const KEYS = {
    token: 'token',
    user: 'currentUser',
    userId: 'userId',
};

export function getToken(): string | null {
    return localStorage.getItem(KEYS.token) || sessionStorage.getItem(KEYS.token);
}

export function getUser<T>(): T | null {
    const raw = localStorage.getItem(KEYS.user) || sessionStorage.getItem(KEYS.user);
    if (!raw) return null;
    try { return JSON.parse(raw); } catch { return null; }
}

export function getUserId(): number {
    const user = getUser<{ id?: number }>();
    if (user?.id) return user.id;
    return Number(localStorage.getItem(KEYS.userId) || 0);
}

export function saveSession(token: string, user: unknown, remember: boolean): void {
    clearSession();
    const store = remember ? localStorage : sessionStorage;
    store.setItem(KEYS.token, token);
    store.setItem(KEYS.user, JSON.stringify(user));
}

export function clearSession(): void {
    localStorage.removeItem(KEYS.token);
    localStorage.removeItem(KEYS.user);
    sessionStorage.removeItem(KEYS.token);
    sessionStorage.removeItem(KEYS.user);
}
