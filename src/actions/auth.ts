'use server';

import { setAuthToken, removeAuthToken, getAuthToken } from '@/utils/auth';
import { signInSchema, signUpSchema, phoneAuthSchema, codeVerificationSchema, type SignInFormValues, type SignUpFormValues, type PhoneAuthFormValues, type CodeVerificationFormValues } from '@/components/content/forms/schemas/authSchemas';

export const emailAuth = async (
  data: SignInFormValues | SignUpFormValues,
  authType: 'login' | 'register'
) => {
  try {
    if (authType === 'login') {
      const validatedData = signInSchema.parse(data);

      const response = await fetch(`${process.env.API_BASE_URL}/auth/sign-in`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validatedData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
      }

      const { access_token } = await response.json();
      await setAuthToken(access_token);
      return { success: true };
    } else {
      const validatedData = signUpSchema.parse(data);

      const payload = {
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: validatedData.email,
        phone: validatedData.phone,
        password: validatedData.password,
        frontendUrl: `${process.env.NEXT_PUBLIC_APP_URL}/verify`,
      };

      const registerResponse = await fetch(`${process.env.API_BASE_URL}/auth/sign-up`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!registerResponse.ok) {
        const error = await registerResponse.json();
        throw new Error(error.message || 'Registration failed');
      }

      return { success: true };
    }
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: 'Internal server error' };
  }
};

export const verifyEmail = async (token: string) => {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/auth/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Verification failed');
    }

    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: 'Internal server error' };
  }
};

export const logout = async (): Promise<void> => {
  try {
    await removeAuthToken();
  } catch (error) {
    throw error;
  }
};

export const phoneAuth = async (
  data: PhoneAuthFormValues | CodeVerificationFormValues,
  step: 'phone' | 'code',
  phone?: string
) => {
  try {
    if (step === 'phone') {
      const validatedData = phoneAuthSchema.parse(data);

      const response = await fetch(`${process.env.API_BASE_URL}/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: validatedData.phone }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to send code');
      }

      return { success: true };
    } else {
      const validatedCode = codeVerificationSchema.parse(data);

      if (!phone) {
        throw new Error('Phone number is required');
      }

      const response = await fetch(`${process.env.API_BASE_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone,
          code: validatedCode.code,
        }),
      });

      if (!response.ok) {
        throw new Error('Invalid code');
      }

      const { access_token } = await response.json();
      await setAuthToken(access_token);
      return { success: true };
    }
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: 'Internal server error' };
  }
};

export const sendResetPasswordEmail = async (email: string) => {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/auth/send-reset-password-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        frontendUrl: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to send reset link');
    }

    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: 'Internal server error' };
  }
};

export const resetPassword = async (token: string, password: string) => {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to reset password');
    }

    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: 'Internal server error' };
  }
};

export const sendEmailVerification = async (newEmail: string) => {
  try {
    const token = await getAuthToken();
    if (!token) {
      return { success: false, error: 'No authentication token' };
    }

    const response = await fetch(`${process.env.API_BASE_URL}/auth/change-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        newEmail,
        frontendUrl: process.env.NEXT_PUBLIC_APP_URL,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return { success: false, error: error.message || 'Failed to send verification email' };
    }

    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: 'Internal server error' };
  }
};

export const verifyNewEmail = async (token: string) => {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/auth/verify-new-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      return { success: false, error: error.message || 'Failed to verify email' };
    }

    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: 'Internal server error' };
  }
};