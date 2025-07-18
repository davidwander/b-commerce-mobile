// src/api.js
const API_URL = 'http://localhost:5000/api'; // Altere para o URL do seu servidor

// Função para criar um novo usuário
export const createUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error('Erro ao criar usuário');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    throw error;
  }
};