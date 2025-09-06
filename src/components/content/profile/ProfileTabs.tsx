'use client';

import { User } from '@/utils/interfaces';

interface ProfileTabsProps {
  selectedTab: string;
  setSelectedTab: (
    tab: "info" | "edit" | "password" | "orders" | "favorites"
  ) => void;
  user: User | null;
}

export default function ProfileTabs({
  selectedTab,
  setSelectedTab,
  user,
}: ProfileTabsProps) {
  const tabs: {
    key: "info" | "edit" | "password" | "orders" | "favorites";
    label: string;
  }[] = [
    { key: "info", label: "Info" },
    { key: "edit", label: "Edit Info" },
    ...(user?.hasPassword
      ? [{ key: "password" as const, label: "Change Password" }]
      : []),
    { key: "orders", label: "My Orders" },
    { key: "favorites", label: "My Favorites" },
  ];

  return (
    <div className="flex space-x-4 pb-10">
      {tabs.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => setSelectedTab(key)}
          className={`px-4 py-2 rounded-full text-sm font-semibold ${
            selectedTab === key
              ? "bg-orange-500 text-white"
              : "bg-gray-700 text-gray-300"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
