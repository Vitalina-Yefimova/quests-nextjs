'use server';

export interface Quest {
  id: string;
  title: string;
  genres: { genreName: string }[];
  players: {
    min: number;
    max: number;
  };
  difficulty: "easy" | "medium" | "hard";
  duration: "60 min" | "90 min" | "120 min";
  description: string;
  image: string;
  imageBg: string;
  price: string;
}

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
    console.error('Error in getAllQuests:', error);
    throw error;
  }
};
