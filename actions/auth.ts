import { baseUrl } from '@/services/api';

export async function signIn(user: { email: string; password: string }) {
  try {
    // Backend expects `senha` instead of `password`
    const payload = { email: user.email, senha: user.password };

    const response = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => ({}));

    return {
      status: response.status,
      data,
    };
  } catch (error) {
    console.error('Erro no signIn:', error);
    throw error;
  }
}

export async function register(user: { nome: string; email: string; password: string }) {
  try {
    // Backend expects 'senha' instead of 'password' and 'nome' as provided
    const payload = { nome: user.nome, email: user.email, senha: user.password };

    const response = await fetch(`${baseUrl}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => ({}));

    return {
      status: response.status,
      data,
    };
  } catch (error) {
    console.error('Erro no register:', error);
    throw error;
  }
}
