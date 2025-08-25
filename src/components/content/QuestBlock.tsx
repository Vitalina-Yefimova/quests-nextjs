"use client";

import Link from "next/link";
import Image from "next/image";
import PersonIcon from "@/components/icons/PersonIcon";
import PuzzleIcon from "@/components/icons/PuzzleIcon";
import CustomCursorWrapper from "@/components/generics/customCursor/CustomCursorWrapper";
import DividerVector from "@/components/generics/divider/DividerVector";
import FavoritesToggle from "@/components/generics/favorites/FavoritesToggle";
import type { Quest } from "@/actions/quests";
import type { User } from "@/actions/user";

interface QuestBlockProps {
  quest: Quest;
  user: User | null;
  onFavoriteChange?: (isFavorite: boolean) => void;
}

export default function QuestBlock({ quest, user, onFavoriteChange }: QuestBlockProps) {

  return (
    <div className="relative group">
      <Link href="/" className="relative group">
        <CustomCursorWrapper>
          <div className="relative w-full">
            <Image
              src={quest.image}
              alt={quest.title}
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover select-none"
            />
            <div className="absolute bottom-0 left-0 w-full p-5 z-10">
              <h3 className="text-white text-2xl font-bold leading-[120%] font-variant-numeric pb-[15px]">
                {quest.title}
              </h3>
              <div className="flex gap-3">
                <div className="flex gap-2">
                  <PersonIcon />
                  <p className="text-[#E5E5E5] text-[13px] leading-[144%] font-medium font-variant-numeric">
                    {typeof quest.players === "object"
                      ? `${quest.players.min} – ${quest.players.max}`
                      : quest.players ?? "?"}
                  </p>
                </div>
                <DividerVector className="bg-white/50 w-[1px] h-[20px]"></DividerVector>
                <div className="flex gap-2">
                  <PuzzleIcon />
                  <p className="text-[#E5E5E5] text-[13px] leading-[144%] font-medium font-variant-numeric">
                    {quest.difficulty}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CustomCursorWrapper>
      </Link>
      {user && (
        <div
          className="absolute top-3 right-3 z-20"
          onClick={(e) => e.stopPropagation()}
        >
          <FavoritesToggle
            questId={quest.id.toString()}
            user={user}
            onChange={onFavoriteChange}
          />
        </div>
      )}
    </div>
  );
}
