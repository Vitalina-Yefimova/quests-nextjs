'use client';

import { useState, useEffect } from 'react';
import { getUserFavorites } from '@/actions/favorites';
import { getAllQuests } from '@/actions/quests';
import { getCurrentUser } from '@/actions/user';
import QuestBlock from '@/components/content/QuestBlock';
import { Quest, User } from '@/utils/interfaces';

type Favorite = {
  questId: string;
};

export default function FavoritesSection() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [allQuests, setAllQuests] = useState<Quest[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [favorites, quests, userResult] = await Promise.all([
        getUserFavorites(),
        getAllQuests(),
        getCurrentUser()
      ]);
      
      const ids: string[] = favorites.map(
        (favorite: Favorite) => favorite.questId
      );
      setFavoriteIds(ids);
      setAllQuests(quests);
      
      if (userResult.success && userResult.user) {
        setUser(userResult.user);
      }
    } catch (err) {
      setError('Failed to load favorites');
      console.error('Error loading favorites:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const favoriteQuests = allQuests.filter((q) => favoriteIds.includes(q.id.toString()));

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mb-4"></div>
          <p className="text-gray-300 text-lg">Loading your favorites...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (favoriteQuests.length === 0) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="text-6xl mb-4">⭐</div>
          <h3 className="text-2xl font-bold text-white mb-2">No Favorites Yet</h3>
          <p className="text-gray-400 text-lg max-w-md">
            Start exploring quests and add them to your favorites to see them here!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
        {favoriteQuests.map((quest) => (
          <div key={quest.id} className="w-full max-w-sm">
            <QuestBlock
              quest={quest}
              user={user}
              onFavoriteChange={(newStatus) => {
                if (!newStatus) {
                  setFavoriteIds((prev) => prev.filter((id) => id !== quest.id.toString()));
                }
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
