import { getQuestById } from '@/actions/quests';
import { getUser } from '@/actions/user';
import PageTitle from '@/components/generics/title/PageTitle';
import ClockIcon from '@/components/icons/ClockIcon';
import PersonIcon from '@/components/icons/PersonIcon';
import PuzzleIcon from '@/components/icons/PuzzleIcon';
import DividerVector from '@/components/generics/divider/DividerVector';
import FavoritesToggle from '@/components/generics/favorites/FavoritesToggle';

interface QuestPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function QuestPage({ params }: QuestPageProps) {
  const { id } = await params;
  
  const [quest, user] = await Promise.all([
    getQuestById(id),
    getUser()
  ]);

  if (!quest) {
    return (
      <div className="min-h-screen bg-[#1E1E1E] text-white">
        <div className="flex justify-center items-center min-h-[400px] pt-20">
          <div className="text-xl">Quest not found</div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-[#1E1E1E] text-white">
      
      <div
        className="relative bg-no-repeat bg-cover bg-center min-h-screen"
        style={{
          backgroundImage: `url(${quest?.imageBg ?? ""})`,
        }}
      >
        <div className="min-h-screen flex flex-col pt-[151px] pl-[600px] pr-[214px]">
          <div className="flex justify-between items-center pr-4 pb-8">
            <PageTitle
              className="pl-6"
              overline={quest?.genres?.map((genre) => genre.genreName).join(", ") || ""}
              title={quest?.title || ""}
            />
            {user && (
              <div className="flex items-center">
                <FavoritesToggle
                  questId={quest.id.toString()}
                  user={user}
                  iconOnly={false}
                />
              </div>
            )}
          </div>

        <div className="flex pl-[30px] gap-4 pb-5">
          <div className="flex gap-2">
            <ClockIcon />
            <p className="text-[#E5E5E5] text-sm not-italic font-normal leading-[144%] font-variant-numeric">
              {quest?.duration}
            </p>
          </div>
          <DividerVector className="bg-white/36 w-[1px] h-[20px]"></DividerVector>
          <div className="flex gap-2">
            <PersonIcon />
            <p className="text-[#E5E5E5] text-sm not-italic font-normal leading-[144%] font-variant-numeric">
              {typeof quest.players === "object"
                ? `${quest.players.min} – ${quest.players.max}`
                : quest.players ?? "?"}
            </p>
          </div>
          <DividerVector className="bg-white/36 w-[1px] h-[20px]"></DividerVector>
          <div className="flex gap-2">
            <PuzzleIcon />
            <p className="text-[#E5E5E5] text-sm not-italic font-normal leading-[144%] font-variant-numeric">
              {quest?.difficulty}
            </p>
          </div>
          <DividerVector className="bg-white/36 w-[1px] h-[20px]"></DividerVector>
          <div className="flex gap-2">
            <p className="text-[#E5E5E5] text-sm not-italic font-normal leading-[144%] font-numeric">
              Price: ${quest?.price ?? "?"}
            </p>
          </div>
        </div>
        
        <p className="text-[#E5E5E5] text-[15px] not-italic font-medium leading-[150%] font-variant-numeric pl-[30px] pb-10">
          {quest?.description}
        </p>

        <button className="flex items-center justify-center w-[200px] h-[60px] bg-[#F28A0F] text-white text-[17px] font-semibold not-italic leading-normal tracking-[0.51px] rounded-full ml-[30px] cursor-none">
          Book Now
        </button>
        </div>
      </div>
    </div>
  );
}
