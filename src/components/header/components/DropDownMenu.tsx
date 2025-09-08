"use client";

import { useEffect, useRef } from "react";
import { logout } from "@/actions/auth";

export default function DropDownMenu({ onClose, onLogout }: { onClose: () => void; onLogout?: () => void }) {
  const menuRef = useRef<HTMLDivElement>(null);
  const isNavigating = useRef(false);

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
  }, []);

  const goTo = (path: string) => {
    if (isNavigating.current) return;
    
    isNavigating.current = true;
    onClose();
    window.location.href = path;
  };
 return (
    <div
      ref={menuRef}
      className="absolute right-0 mt-2 bg-white text-black rounded-md shadow-md w-36 z-50"
    >
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          goTo("/profile");
        }}
        className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
      >
        My Profile
      </button>
      <button
        onClick={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          await logout();
          onClose();
          onLogout?.();
          window.location.href = "/";
        }}
        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
      >
        Logout
      </button>
    </div>
  );
}