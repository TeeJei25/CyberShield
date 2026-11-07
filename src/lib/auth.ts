import { createAuthClient } from 'better-auth/react';
import { anonymousClient, jwtClient } from 'better-auth/client/plugins';
import { expoClient } from '@better-auth/expo/client';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
export const AUTH_URL = 'https://auth-cd315afa-a83b-44ae-8568-4d59ee9d6eff-dev.api.newlyapp.com';
export const API_URL = 'https://api-cd315afa-a83b-44ae-8568-4d59ee9d6eff-dev.api.newlyapp.com';
const BEARER_TOKEN_KEY = 'cybershield_za_bearer';
const memory = new Map<string, string>();
const nativeStorage = {
 getItem: (key: string): string | null => { try { const value = SecureStore.getItem(key); if (value != null) return value; } catch {} return memory.get(key) ?? null; },
 getItemAsync: async (key: string): Promise<string | null> => nativeStorage.getItem(key),
 setItem: (key: string, value: string): void => { try { SecureStore.setItem(key, value); memory.delete(key); } catch { memory.set(key, value); } },
 setItemAsync: async (key: string, value: string): Promise<void> => nativeStorage.setItem(key, value),
 deleteItem: async (key: string) => { memory.delete(key); try { await SecureStore.deleteItemAsync(key); } catch {} },
};
const webStorage = {
 getItem: (key: string): string | null => localStorage.getItem(key), getItemAsync: async (key: string) => localStorage.getItem(key),
 setItem: (key: string, value: string) => localStorage.setItem(key,value), setItemAsync: async (key:string,value:string) => localStorage.setItem(key,value), deleteItem: async (key:string) => localStorage.removeItem(key),
};
export const tokenStorage = Platform.OS === 'web' ? webStorage : nativeStorage;
export const authClient = createAuthClient({ baseURL: AUTH_URL, plugins: [anonymousClient(), jwtClient(), expoClient({ scheme: 'expobase', storagePrefix: 'cybershield_za', storage: tokenStorage })], fetchOptions: {
 onSuccess: async (ctx: { response: Response }) => { const jwt = ctx.response.headers.get('set-auth-jwt'); if (jwt) tokenStorage.setItem(BEARER_TOKEN_KEY,jwt); },
 ...(Platform.OS === 'web' ? { credentials: 'include' as const } : {}),
} });
export async function getScanToken() {
 const session = await authClient.getSession();
 if (!session.data) { const signIn = await authClient.signIn.anonymous(); if (signIn.error) throw new Error('A private AI session could not be started. Please try again.'); }
 const result = await authClient.token();
 if (result.error || !result.data?.token) throw new Error('The private session could not be verified. Please try again.');
 tokenStorage.setItem(BEARER_TOKEN_KEY, result.data.token);
 return result.data.token;
}
export async function deleteGuestSession() {
 const session = await authClient.getSession();
 if (session.error) throw new Error('Could not check the private session. Please try again online.');
 if (session.data) { const result = await authClient.deleteUser(); if (result.error) throw new Error('The private session could not be deleted. Please try again.'); }
 await tokenStorage.deleteItem(BEARER_TOKEN_KEY);
}
