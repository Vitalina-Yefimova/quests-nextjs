"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import AllQuestsIcon from "@/components/icons/AllQuestsIcon";
import HorrorIcon from "@/components/icons/HorrorIcon";
import MysteryIcon from "@/components/icons/MysteryIcon";
import DetectiveIcon from "@/components/icons/DetectiveIcon";
import AdventureIcon from "@/components/icons/AdventureIcon";
import SciFiIcon from "@/components/icons/SciFiIcon";
import CustomCursorWrapper from "@/components/generics/customCursor/CustomCursorWrapper";
import DividerVector from "@/components/generics/divider/DividerVector";

interface Genre {
  genreName: string;
  icon: React.ReactElement;
}

const genres: Genre[] = [
  { genreName: "Horror", icon: <HorrorIcon /> },
  { genreName: "Mystery", icon: <MysteryIcon /> },
  { genreName: "Detective", icon: <DetectiveIcon /> },
  { genreName: "Adventure", icon: <AdventureIcon /> },
  { genreName: "Sci-fi", icon: <SciFiIcon /> },
];

export default function GenreNavigation() {
  const searchParams = useSearchParams();
  const activeGenre = searchParams.get('genre') || '';
  const [availableGenres] = useState<Genre[]>(genres);

  return (
    <nav className="pl-[137px] pb-[39px] relative">
      <ul className="flex gap-10 text-[#E5E5E5] text-sm font-bold leading-[140%] tracking-[-0.28px]">
        <li className="flex">
          <CustomCursorWrapper>
            <Link href="/" className="flex flex-col cursor-none">
              <div className="flex items-center gap-3">
                <AllQuestsIcon />
                <span>All Quests</span>
              </div>
              {(!activeGenre || activeGenre === '') && (
                <div className="ml-[37px] w-[67px] h-[1.5px] bg-[#F2890F] transition-all duration-200"></div>
              )}
            </Link>
          </CustomCursorWrapper>
          <DividerVector className="bg-white/32 w-[1.5px] h-[40px] ml-10"/>
        </li>

        {availableGenres.map(({ icon, genreName }, index) => (
          <li className="flex" key={genreName}>
            <CustomCursorWrapper>
              <Link
                href={`/?genre=${genreName}`}
                className="flex flex-col items-center cursor-none"
              >
                <div className="flex items-center gap-3 pr-10">
                  {icon}
                  {genreName}
                </div>
                {activeGenre === genreName && (
                  <div className="ml-[17px] w-1/2 h-[1.5px] bg-[#F2890F]"/>
                )}
              </Link>
            </CustomCursorWrapper>
            {index < availableGenres.length - 1 && (
              <div className="bg-white/32 w-[1.5px] h-[40px]"/>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
