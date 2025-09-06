'use client';

import { useState, useEffect } from "react";
import PageTitle from "@/components/generics/title/PageTitle";
import QuestBlock from "@/components/content/QuestBlock";
import GenreNavigation from "@/components/content/GenreNavigation";
import { getAllQuests } from "@/actions/quests";
import { getCurrentUser } from "@/actions/user";
import type { Quest } from "@/utils/interfaces";
import type { User } from "@/utils/interfaces";

export default function Home({
  searchParams,
}: { searchParams?: Promise<{ genre?: string }> }) {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [questsData, userResult] = await Promise.all([
          getAllQuests(),
          getCurrentUser()
        ]);
        
        setQuests(questsData);
        if (userResult.success && userResult.user) {
          setUser(userResult.user);
        }
        
        const params = await searchParams;
        setSelectedGenre(params?.genre ?? undefined);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [searchParams]);

  const filteredQuests = selectedGenre
    ? quests.filter(quest => quest.genres?.some(questGenre => questGenre.genreName === selectedGenre))
    : quests;

  if (isLoading) {
    return (
      <div className="relative">
        <div className="pb-12 pt-[122px] pl-[136px]">
          <PageTitle overline="Quests in Calgary" title="Find Your Quest" />
        </div>
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-white text-xl">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="pb-12 pt-[122px] pl-[136px]">
        <PageTitle overline="Quests in Calgary" title="Find Your Quest" />
      </div>
      <GenreNavigation />
      <div className="grid grid-cols-3 gap-x-6 gap-y-8 pl-[136px] pr-[150px] pb-20">
        {(filteredQuests ?? []).map((quest) =>
          quest ? <QuestBlock key={quest.id.toString()} quest={quest} user={user} /> : null
        )}
      </div>
    </div>
  );
}