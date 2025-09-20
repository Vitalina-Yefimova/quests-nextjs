'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createOrder } from "@/actions/orders";
import Button from "@/components/generics/button/Button";
import CalendarIcon from "@/components/icons/CalendarIcon";

interface OrderFormProps {
  onSubmitSuccess: () => void;
  questId: string;
  minPlayers: number;
  maxPlayers: number;
}

const schema = z.object({
  date: z.string().min(1, "Date is required").refine((date) => {
    const selectedDate = new Date(date);
    const today = new Date();
    const minDate = new Date(today);
    minDate.setDate(today.getDate() + 7);
    return selectedDate >= minDate;
  }, "Date must be at least 7 days from today"),
  participants: z.string().min(1, "Number of participants is required"),
});

export default function OrderForm({
  onSubmitSuccess,
  questId,
  minPlayers,
  maxPlayers,
}: OrderFormProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const today = new Date();
  const minOrderDate = new Date(today);
  minOrderDate.setDate(today.getDate() + 7);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    setError(null);
    if (!questId) {
      setError("Missing quest ID");
      return;
    }

    const selectedDate = new Date(data.date);
    const today = new Date();
    const minDate = new Date(today);
    minDate.setDate(today.getDate() + 7);
    
    if (selectedDate < minDate) {
      setError("Date must be at least 7 days from today");
      return;
    }

    const participants = Number(data.participants);
    if (participants < minPlayers || participants > maxPlayers) {
      setError(`Number of participants must be between ${minPlayers} and ${maxPlayers}`);
      return;
    }

    const result = await createOrder({
      questId,
      date: data.date,
      participants,
    });

    if (result.success) {
      setIsSuccess(true);
      setTimeout(() => {
        onSubmitSuccess();
        reset();
        router.push("/profile?selectedTab=orders");
      }, 1000);
    } else {
      setError(result.error || "Failed to order the quest.");
    }
  };

  return (
    <div>
      <h2 className="text-white text-2xl font-bold text-center mb-6">
        Order this Quest
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
        <div className="w-full">
          <div className="relative w-full">
            <input
              {...register("date")}
              type="date"
              min={minOrderDate.toISOString().split("T")[0]}
              max="2030-12-31"
              className="w-full h-[45px] pl-4 pr-12 border border-white rounded-[3px] bg-transparent text-[#E5E5E5] text-base placeholder:text-[#A5A5A5] focus:outline-none [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-3 [&::-webkit-calendar-picker-indicator]:w-5 [&::-webkit-calendar-picker-indicator]:h-5 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
            />
            <button
              type="button"
              onClick={() => (document.querySelector('input[type="date"]') as HTMLInputElement)?.showPicker()}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white hover:text-[#F28A0F] transition-colors pointer-events-auto"
            >
              <CalendarIcon className="w-5 h-5" />
            </button>
          </div>
          {errors.date && (
            <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>
          )}
        </div>

        <div className="w-full">
          <input
            {...register("participants")}
            type="number"
            min={minPlayers}
            max={maxPlayers}
            placeholder={`Number of Participants (Allowed: ${minPlayers}-${maxPlayers})`}
            className="w-full h-[45px] px-4 border border-white rounded-[3px] bg-transparent text-[#E5E5E5] text-base placeholder:text-[#A5A5A5] focus:outline-none"
          />
          {errors.participants && (
            <p className="text-red-500 text-xs mt-1">
              {errors.participants.message}
            </p>
          )}
        </div>

        <div className="flex justify-center mt-5">
          <Button
            type="submit"
            className="w-[200px] h-[45px] rounded-full bg-[#F28A0F] text-white font-extrabold text-sm cursor-none"
          >
            {isSuccess ? "Ordered!" : "Order Now"}
          </Button>
        </div>

        {error && <p className="text-red-500 text-center text-sm">{error}</p>}
      </form>
    </div>
  );
}
