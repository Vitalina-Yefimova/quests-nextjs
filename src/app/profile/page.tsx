import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getUser } from '@/actions/user';
import ProfileTabs from '@/components/content/profile/ProfileTabs';

export default async function ProfilePage({
  searchParams,
}: {
  searchParams?: Promise<{ selectedTab?: string }>;
}) {
  const user = await getUser();
  
  if (!user) {
    redirect('/');
  }

  const params = await searchParams;
  const selectedTab = params?.selectedTab || "info";

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
        <ProfileTabs user={user} initialTab={selectedTab} />
      </div>
    </div>
  );
}
