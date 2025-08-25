import PageTitle from "@/components/generics/title/PageTitle";
import QuestBlock from "@/components/content/QuestBlock";
import GenreNavigation from "@/components/content/GenreNavigation";
import { getAllQuests, type Quest } from "@/actions/quests";

export default async function Home({
  searchParams,
}: { searchParams?: Promise<{ genre?: string }> }) {
  const params = await searchParams;
  const selectedGenre = params?.genre ?? undefined;
  const quests: Quest[] = await getAllQuests();

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
          quest ? <QuestBlock key={quest.id.toString()} quest={quest} user={null} /> : null
        )}
      </div>
    </div>
  );
}