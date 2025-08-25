export const logout = async (): Promise<void> => {
  try {
    await fetch('/api/auth/logout', { method: 'POST' });
    localStorage.removeItem('userId');
  } catch (error) {
    console.error('Error in logout:', error);
  }
};
