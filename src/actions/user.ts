'use server';

import { cookies } from 'next/headers';

export interface User {
  id: string;
  lastName: string;
  firstName: string;
  phone: string;
  email: string;
  verify?: boolean;
  emailVerified?: boolean;
  newEmail?: string;
  hasPassword?: boolean;
  authMethod: "email" | "phone";
}

export const getUser = async (id: string): Promise<User> => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;

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
  userData: Partial<Pick<User, 'firstName' | 'lastName' | 'phone' | 'email'> & { oldPassword?: string; password?: string }>
): Promise<User> => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;

    if (!token) {
      throw new Error('No authentication token');
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
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error('Error in updateUser:', error);
    throw error;
  }
};
