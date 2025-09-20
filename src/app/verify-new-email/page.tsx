import { verifyNewEmail } from '@/actions/auth';
import Link from 'next/link';

export default async function VerifyNewEmailPage({
  searchParams,
}: {
  searchParams?: Promise<{ token?: string }>;
}) {
  const params = await searchParams;
  const token = params?.token;

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-md p-6 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-700 mb-6">No verification token provided.</p>
          <Link href="/profile" className="text-blue-600 hover:underline">
            Go to Profile
          </Link>
        </div>
      </div>
    );
  }

  const result = await verifyNewEmail(token);
  
  if (result.success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-md p-6 text-center">
          <h1 className="text-2xl font-bold text-green-600 mb-4">Success!</h1>
          <p className="text-gray-700 mb-6">Email successfully verified!</p>
          <Link href="/profile" className="text-blue-600 hover:underline">
            Go to Profile
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-md p-6 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-700 mb-6">Email verification failed. Please try again.</p>
          <Link href="/profile" className="text-blue-600 hover:underline">
            Go to Profile
          </Link>
        </div>
      </div>
    );
  }
}
