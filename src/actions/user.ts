'use server';

import { User } from '@/utils/interfaces';
import { getAuthToken } from '@/utils/auth';

export const getUser = async (id: string): Promise<User> => {
  try {
    const token = await getAuthToken();

    if (!token) {
      throw new Error('No authentication token');
    }

    const response = await fetch(`${process.env.API_BASE_URL}/users/${id}`, {
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
    console.error('Error in getUser:', error);
    throw error;
  }
};

export const updateUser = async (
  id: string,
  userData: Partial<Pick<User, 'firstName' | 'lastName' | 'phone' | 'email'> & { oldPassword?: string; password?: string; newEmail?: string }>
) => {
  try {
    const token = await getAuthToken();

    if (!token) {
      return { success: false, error: 'No authentication token' };
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    const response = await fetch(`${process.env.API_BASE_URL}/users/${id}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(userData),
      cache: 'no-store',
    });

    if (!response.ok) {
      const error = await response.json();
      return { success: false, error: error.message || `HTTP error! status: ${response.status}` };
    }

    const updatedUser = await response.json();
    return { success: true, user: updatedUser };
  } catch (error) {
    console.error('Error in updateUser:', error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: 'Internal server error' };
  }
};


export const changePassword = async (userId: string, data: {
  oldPassword: string;
  newPassword: string;
}) => {
  const result = await updateUser(userId, {
    password: data.newPassword,
    oldPassword: data.oldPassword,
  });

  if (result.success) {
    return { success: true };
  } else {
    return { success: false, error: result.error };
  }
};

export const getCurrentUser = async () => {
  try {
    const token = await getAuthToken();

    if (!token) {
      return { success: false, error: 'No authentication token' };
    }

    const response = await fetch(`${process.env.API_BASE_URL}/users/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return { success: false, error: 'Failed to get user data' };
    }

    const userData = await response.json();
    return { success: true, user: userData };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: 'Internal server error' };
  }
};