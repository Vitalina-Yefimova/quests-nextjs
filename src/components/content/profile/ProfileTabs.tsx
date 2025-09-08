'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { User } from '@/utils/interfaces';
import ProfileInfoSection from './ProfileInfoSection';
import ProfileEditSection from './ProfileEditSection';
import ChangePasswordSection from './ChangePasswordSection';
import OrdersSection from './OrdersSection';
import FavoritesSection from './FavoritesSection';

interface ProfileTabsProps {
  user: User;
  initialTab?: string;
}

export default function ProfileTabs({
  user: initialUser,
  initialTab = "info",
}: ProfileTabsProps) {
  const [user, setUser] = useState<User>(initialUser);
  const [selectedTab, setSelectedTab] = useState<
    "info" | "edit" | "password" | "orders" | "favorites"
  >(initialTab as any);
  const searchParams = useSearchParams();

  useEffect(() => {
    const tabFromUrl = searchParams.get("selectedTab");
    if (
      tabFromUrl === "edit" ||
      tabFromUrl === "password" ||
      tabFromUrl === "orders" ||
      tabFromUrl === "favorites"
    ) {
      setSelectedTab(tabFromUrl);
    }
  }, [searchParams]);

  const handleUserUpdate = (updatedUser: User) => {
    setUser(updatedUser);
  };

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
    <>
      <h1 className="text-3xl font-bold pb-10 text-center">My Profile</h1>

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

      <div className="flex flex-col items-center font-sans pl-20">
        {selectedTab === "info" && <ProfileInfoSection user={user} />}
        {selectedTab === "edit" && (
          <ProfileEditSection 
            user={user} 
            onUserUpdate={handleUserUpdate} 
          />
        )}
        {selectedTab === "password" && user?.hasPassword && (
          <ChangePasswordSection user={user} />
        )}
        {selectedTab === "orders" && <OrdersSection />}
        {selectedTab === "favorites" && <FavoritesSection />}
      </div>
    </>
  );
}
