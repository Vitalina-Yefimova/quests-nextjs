import { verifyEmail } from '@/actions/auth';
import Link from "next/link";

export default async function VerifyPage({
  searchParams,
}: {
  searchParams?: Promise<{ token?: string }>;
}) {
  const params = await searchParams;
  const token = params?.token;

  if (!token) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-md p-6 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-4 text-red-600">Verification Error</h1>
          </div>
          
          <div className="text-gray-700 mb-6">
            <p className="mb-3">
              No verification token provided.
            </p>
            <p className="text-sm">
              Please check your email and click the verification link again.
            </p>
          </div>

          <Link
            href="/auth?type=login&method=email"
            className="block w-full px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition font-medium text-center"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const result = await verifyEmail(token);
  
  if (result.success) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-md p-6 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-4 text-gray-800">Email Verified!</h1>
          </div>
          
          <div className="text-gray-700 mb-6">
            <p className="mb-3">
              Your email has been successfully verified.
            </p>
            <p className="text-sm">
              You can now sign in to your account.
            </p>
          </div>

          <Link
            href="/auth?type=login&method=email"
            className="block w-full px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition font-medium text-center"
          >
            Sign in to your account
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-md p-6 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-4 text-red-600">Verification Failed</h1>
          </div>
          
          <div className="text-gray-700 mb-6">
            <p className="mb-3">
              {result.error || 'Email verification failed.'}
            </p>
            <p className="text-sm">
              Please try again.
            </p>
          </div>

          <Link
            href="/auth?type=login&method=email"
            className="block w-full px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition font-medium text-center"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }
}
