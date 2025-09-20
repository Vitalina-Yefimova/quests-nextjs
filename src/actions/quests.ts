'use server';

import { Quest } from '@/utils/interfaces';

export const getAllQuests = async (): Promise<Quest[]> => {

  try {
    const response = await fetch(`${process.env.API_BASE_URL}/quests`, {
      cache: 'no-store',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch quests');
    }
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const getQuestById = async (id: string): Promise<Quest> => {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/quests/${id}`, {
      cache: 'no-store',
    });
    if (!response.ok) {
      throw new Error('Quest not found');
    }
    return response.json();
  } catch (error) {
    throw error;
  }
};
