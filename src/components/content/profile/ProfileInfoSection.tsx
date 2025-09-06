'use client';

import { User } from '@/utils/interfaces';

interface ProfileInfoSectionProps {
  user: User;
}

export default function ProfileInfoSection({ user }: ProfileInfoSectionProps) {
  return (
    <div className="space-y-4 text-[#E5E5E5]">
      <p>
        <strong>First Name:</strong> {user.firstName || "—"}
      </p>
      <p>
        <strong>Last Name:</strong> {user.lastName || "—"}
      </p>
      <p>
        <strong>Phone:</strong> {user.phone}
      </p>
      <p>
        <strong>Email:</strong> {user.email || "—"}
        {user.emailVerified && (
          <span className="text-green-400 text-sm ml-2">✓ Verified</span>
        )}
      </p>
    </div>
  );
}
