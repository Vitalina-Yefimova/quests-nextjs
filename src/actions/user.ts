'use server';

import { User } from '@/utils/interfaces';
import { getAuthToken } from '@/utils/auth';
import { profileEditSchema, changePasswordSchema, type ProfileEditFormValues, type ChangePasswordFormValues } from '@/components/content/profile/schemas/profileSchemas';

export const getUser = async (): Promise<User | null> => {
  try {
    const token = await getAuthToken();

    if (!token) {
      return null;
    }

    const response = await fetch(`${process.env.API_BASE_URL}/users`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      return null;
    }
    return response.json();
  } catch (error) {
    return null;
  }
};

export const updateUser = async (
  userData: ProfileEditFormValues & { oldPassword?: string; password?: string; newEmail?: string }
) => {
  try {
    const profileData: any = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone,
    };

    if (userData.newEmail) {
      profileData.email = userData.newEmail;
    } else if (userData.email) {
      profileData.email = userData.email;
    }

    const token = await getAuthToken();

    if (!token) {
      return { success: false, error: 'No authentication token' };
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };

    const response = await fetch(`${process.env.API_BASE_URL}/users`, {
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
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: 'Internal server error' };
  }
};

export const changePassword = async (data: ChangePasswordFormValues) => {
  try {
    const validatedData = changePasswordSchema.parse(data);
    const token = await getAuthToken();

    if (!token) {
      return { success: false, error: 'No authentication token' };
    }

    const response = await fetch(`${process.env.API_BASE_URL}/users`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        password: validatedData.newPassword,
        oldPassword: validatedData.oldPassword,
      }),
      cache: 'no-store',
    });

    if (!response.ok) {
      const error = await response.json();
      return { success: false, error: error.message || `HTTP error! status: ${response.status}` };
    }

    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: 'Internal server error' };
  }
};

