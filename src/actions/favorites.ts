'use server';

import { getAuthToken } from '@/utils/auth';

export const addFavorite = async (questId: string) => {
  try {
    const token = await getAuthToken();

    if (!token) {
      throw new Error('No authentication token');
    }

    const response = await fetch(`${process.env.API_BASE_URL}/favorites`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ questId }),
      cache: 'no-store',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error in addFavorite:', error);
    throw error;
  }
};

export const removeFavorite = async (questId: string) => {
  try {
    const token = await getAuthToken();

    if (!token) {
      throw new Error('No authentication token');
    }

    const response = await fetch(`${process.env.API_BASE_URL}/favorites/${questId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      cache: 'no-store',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error in removeFavorite:', error);
    throw error;
  }
};

export const getUserFavorites = async () => {
  try {
    const token = await getAuthToken();

    if (!token) {
      throw new Error('No authentication token');
    }

    const response = await fetch(`${process.env.API_BASE_URL}/favorites`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error in getUserFavorites:', error);
    throw error;
  }
};
