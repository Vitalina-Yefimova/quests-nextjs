import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const otpData = await request.json();

    const response = await fetch(`${process.env.API_BASE_URL}/auth/send-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(otpData),
    });

    if (response.ok) {
      const result = await response.json();
      return NextResponse.json(result);
    }

    return NextResponse.json(
      { error: 'Failed to send OTP' },
      { status: response.status }
    );
  } catch (error) {
    console.error('Send OTP error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
