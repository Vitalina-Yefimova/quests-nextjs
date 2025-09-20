'use client';

import BasePopup from "@/components/generics/popups/BasePopup";
import OrderForm from "@/components/content/forms/OrderForm";
import { useRouter } from 'next/navigation';

interface OrderPopupProps {
  questId: string;
  minPlayers: number;
  maxPlayers: number;
}

export default function OrderPopup({
  questId,
  minPlayers,
  maxPlayers,
}: OrderPopupProps) {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  const handleOrderSuccess = () => {
  };

  return (
    <BasePopup onClose={handleClose}>
      <OrderForm
        onSubmitSuccess={handleOrderSuccess}
        questId={questId}
        minPlayers={minPlayers}
        maxPlayers={maxPlayers}
      />
    </BasePopup>
  );
}
