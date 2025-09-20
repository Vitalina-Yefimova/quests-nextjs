"use client";

import { useState, useEffect } from "react";
import {
  addFavorite,
  removeFavorite,
  getUserFavorites,
} from "@/actions/favorites";
import StarIcon from "@/components/icons/StarIcon";
import StarOutlineIcon from "@/components/icons/StarOutlineIcon";
import CustomCursorWrapper from "@/components/generics/customCursor/CustomCursorWrapper";
import type { User } from "@/utils/interfaces";

interface FavoritesToggleProps {
  questId: string | number;
  user: User | null;
  className?: string;
  iconOnly?: boolean;
  onChange?: (isFavorite: boolean) => void;
}

export default function FavoritesToggle({
  questId,
  user,
  className = "",
  iconOnly = true,
  onChange,
}: FavoritesToggleProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const checkFavorite = async () => {
    if (user && questId) {
      const favorites = await getUserFavorites();
      const exists = favorites.some(
        (favorite: { questId: string }) => favorite.questId === questId.toString()
      );
      setIsFavorite(exists);
    }
  };

  useEffect(() => {
    checkFavorite();
  }, [user, questId]);

  const toggleFavorite = async () => {
    if (!user) return;
    
    if (isFavorite) {
      await removeFavorite(questId.toString());
      setIsFavorite(false);
      onChange?.(false);
    } else {
      await addFavorite(questId.toString());
      setIsFavorite(true);
      onChange?.(true);
    }
  };

  if (!user) return null;

  return (
    <CustomCursorWrapper>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleFavorite();
        }}
        className={`transition cursor-none p-2 min-w-[40px] min-h-[40px] flex items-center justify-center ${className}`}
      >
        {iconOnly ? (
          isFavorite ? (
            <StarIcon />
          ) : (
            <StarOutlineIcon />
          )
        ) : (
          <span
            className={`flex items-center justify-center text-white font-semibold min-w-[200px] h-[50px] rounded-full shadow-lg transition duration-300 cursor-none ${
              isFavorite
                ? "bg-red-600 hover:bg-red-700"
                : "bg-[#F28A0F] hover:bg-[#d97706]"
            }`}
          >
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </span>
        )}
      </button>
    </CustomCursorWrapper>
  );
}
