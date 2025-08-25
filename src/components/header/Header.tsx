"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import CustomCursorWrapper from "@/components/generics/customCursor/CustomCursorWrapper";
import { ChevronDown, User as UserIcon } from "lucide-react";
import DropDownMenu from "@/components/header/components/DropDownMenu";
import EscapeRoomIcon from "@/components/icons/EscapeRoomIcon";
import Navigation from "@/components/header/components/Navigation";
import PhoneNumber from "@/components/header/components/PhoneNumber";
import type { User } from "@/actions/user";

export default function Header({ className = "" }: { className?: string }) {
  const [user, setUser] = useState<User | null>(null);
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header
        className={`flex justify-between pl-8 h-[74px] fixed top-0 left-0 w-full z-50 ${className}`}
      >
        
        <Link href="/" className="mt-6 cursor-none">
          <CustomCursorWrapper>
            <EscapeRoomIcon />
          </CustomCursorWrapper>
        </Link>

              <Navigation />

        <div className="flex items-center gap-6 pr-8">
          <PhoneNumber />

          <div className="flex items-center gap-3 font-bold pt-10">
            {user ? (
              <div className="relative" ref={menuRef}>
                <CustomCursorWrapper>
                  <button
                    onClick={() => setOpenMenu((prev) => !prev)}
                    className="text-sm bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition flex items-center gap-2 cursor-none"
                  >
                    My Profile
                    <ChevronDown size={20} className="mt-[1px]" />
                  </button>
                </CustomCursorWrapper>

                {openMenu && <DropDownMenu onClose={() => setOpenMenu(false)} />}
              </div>
            ) : (
              <CustomCursorWrapper>
                <button
                  className="text-white text-sm bg-[#F28A0F] transition px-5 py-2 rounded-md cursor-none"
                >
                  <UserIcon size={18} className="inline mr-2" />
                  Log in
                </button>
              </CustomCursorWrapper>
            )}
          </div>
        </div>
      </header>
    </>
  );
}