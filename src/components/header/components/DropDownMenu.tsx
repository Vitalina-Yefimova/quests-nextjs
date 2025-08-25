"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/utils/auth";

export default function DropDownMenu({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const goTo = (path: string) => {
    router.push(path);
    onClose();
  };
 return (
    <div
      ref={menuRef}
      className="absolute right-0 mt-2 bg-white text-black rounded-md shadow-md w-36 z-50"
    >
      <button
        onClick={() => goTo("/profile")}
        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
      >
        My Profile
      </button>
      <button
        onClick={async () => {
          await logout();
          onClose();
        }}
        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
      >
        Logout
      </button>
    </div>
  );
}