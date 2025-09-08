import PageTitle from "@/components/generics/title/PageTitle";
import QuestBlock from "@/components/content/QuestBlock";
import GenreNavigation from "@/components/content/GenreNavigation";
import { getAllQuests } from "@/actions/quests";
import { getUser } from "@/actions/user";

export default async function Home({
  searchParams,
}: { searchParams?: Promise<{ genre?: string }> }) {
  const [questsData, user, params] = await Promise.all([
    getAllQuests(),
    getUser(),
    searchParams
  ]);
  
  const quests = questsData;
  const selectedGenre = params?.genre;

  const filteredQuests = selectedGenre
    ? quests.filter(quest => quest.genres?.some(questGenre => questGenre.genreName === selectedGenre))
    : quests;

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