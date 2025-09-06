import { cookies } from 'next/headers';
import { COOKIE_NAMES } from './tokens';

export const getAuthToken = async (): Promise<string | null> => {
  try {
    const cookieStore = await cookies();
    return cookieStore.get(COOKIE_NAMES.ACCESS_TOKEN)?.value || null;
  } catch (error) {
    console.error('Error getting access token:', error);
    return null;
  }
};

export const setAuthToken = async (token: string): Promise<void> => {
  try {
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAMES.ACCESS_TOKEN, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7,
    });
  } catch (error) {
    console.error('Error setting access token:', error);
  }
};

export const removeAuthToken = async (): Promise<void> => {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_NAMES.ACCESS_TOKEN);
  } catch (error) {
    console.error('Error removing access token:', error);
  }
};
