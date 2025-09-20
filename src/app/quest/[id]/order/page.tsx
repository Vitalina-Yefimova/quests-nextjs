import { getQuestById } from '@/actions/quests';
import OrderPopup from '@/components/content/popups/OrderPopup';

interface OrderPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function OrderPage({ params }: OrderPageProps) {
  const { id } = await params;
  
  const quest = await getQuestById(id);

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
      <OrderPopup
        questId={quest.id.toString()}
        minPlayers={typeof quest.players === "object" ? quest.players.min : 1}
        maxPlayers={typeof quest.players === "object" ? quest.players.max : 8}
      />
    </div>
  );
}
