import { NextRequest, NextResponse } from 'next/server';
import { spinwheelClient } from '@/lib/spinwheel';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, code } = body;

    if (!userId || !code) {
      return NextResponse.json(
        { error: 'userId and OTP code are required' },
        { status: 400 }
      );
    }

    const result = await spinwheelClient.verifyOTP({
      userId,
      code,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return NextResponse.json(
      { 
        error: 'Failed to verify OTP',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

