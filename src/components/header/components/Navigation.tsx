"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import CustomCursorWrapper from "@/components/generics/customCursor/CustomCursorWrapper";

interface NavItems {
    path: string;
    label: string;
}

export default function Navigation() {
    const pathname = usePathname();

const navItems: NavItems[] = [
    { path: "/", label: "QUESTS" },
    { path: "/for-beginners", label: "FOR BEGINNERS" },
    { path: "/testimonials", label: "TESTIMONIALS" },
    { path: "/special-offers", label: "SPECIAL OFFERS" },
    { path: "/contacts", label: "CONTACTS" },
];  
  
const isActive = (path: string) => {
  if (path === "/") {
    return pathname === "/" || pathname?.startsWith("/genre")
  }
  return pathname === path || pathname?.startsWith(path + "/")
}
  
return (
    <nav className="relative">
      <ul className="flex gap-[47px] pt-10">
        {navItems.map(({ path, label }) => (
          <li key={path}>
            <CustomCursorWrapper>
              <Link
                href={path}
                className={`text-sm font-semibold leading-normal not-italic tracking-[0.42px] cursor-none ${
                  isActive(path) ? "text-[#F2890F]" : "text-[#F0F0F0]"
                }`}
              >
                {label}
              </Link>
            </CustomCursorWrapper>
          </li>
        ))}
      </ul>
    </nav>
  );
}