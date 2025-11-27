import type { User } from '@/types/interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '@/services/api';
import { TOKEN_KEY } from '@/lib/constants';

export async function getStoredToken(): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error('Erro ao obter token:', error);
    return null;
  }
}

export async function setStoredToken(token: string): Promise<void> {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error('Erro ao salvar token:', error);
    throw error;
  }
}

export async function removeStoredToken(): Promise<void> {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error('Erro ao remover token:', error);
    throw error;
  }
}

export async function loginUser(
  email: string,
  password: string
): Promise<{ token: string; userWithoutPassword: User }> {
  try {
    const response = await api.post('/auth/login', {
      email,
      senha: password,
    });
    return response.data;
  } catch (error) {
    console.log('Erro ao fazer login:', error);
    throw error;
  }
}

export async function registerUser(
  email: string,
  password: string,
  nome?: string
): Promise<{ token: string; userWithoutPassword: User }> {
  try {
    const response = await api.post('/auth/register', {
      email,
      senha: password,
      nome,
    });
    return response.data;
  } catch (error) {
    console.log('Erro ao registrar usuário:', error);
    throw error;
  }
}
