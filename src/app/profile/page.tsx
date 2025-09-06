'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { User } from '@/utils/interfaces';
import Header from '@/components/header/Header';
import { getCurrentUser } from '@/actions/user';
import ProfileTabs from '@/components/content/profile/ProfileTabs';
import ProfileInfoSection from '@/components/content/profile/ProfileInfoSection';
import ProfileEditSection from '@/components/content/profile/ProfileEditSection';
import ChangePasswordSection from '@/components/content/profile/ChangePasswordSection';
import OrdersSection from '@/components/content/profile/OrdersSection';
import FavoritesSection from '@/components/content/profile/FavoritesSection';

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<
    "info" | "edit" | "password" | "orders" | "favorites"
  >("info");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchUser = async () => {
      const result = await getCurrentUser();
      if (result.success && result.user) {
        setUser(result.user);
      } else {
        router.push('/');
      }
      setIsLoading(false);
    };

    fetchUser();
  }, [router]);

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1E1E1E] text-white">
        <Header />
        <div className="pt-20 flex justify-center items-center">
          <div className="text-xl">Loading...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-white">
      
      <div className="pt-10 pl-10 bg-[#1E1E1E] fixed">
        <Link
          href="/"
          className="text-[#F28A0F] underline text-sm hover:text-white transition"
        >
          Return to Home
        </Link>
      </div>

      <div className="flex flex-col items-center pt-30 min-h-screen bg-[#1E1E1E] text-white px-4">
        <h1 className="text-3xl font-bold pb-10 text-center">My Profile</h1>

        <ProfileTabs
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
          user={user}
        />

        <div className="flex flex-col items-center font-sans pl-20">
          {selectedTab === "info" && <ProfileInfoSection user={user} />}
          {selectedTab === "edit" && (
            <ProfileEditSection 
              user={user} 
              onUserUpdate={(updatedUser) => setUser(updatedUser)} 
            />
          )}
          {selectedTab === "password" && user?.hasPassword && (
            <ChangePasswordSection user={user} />
          )}
          {selectedTab === "orders" && <OrdersSection />}
          {selectedTab === "favorites" && <FavoritesSection />}
        </div>
      </div>
    </div>
  );
}
