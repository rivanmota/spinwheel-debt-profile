import { NextRequest, NextResponse } from 'next/server';
import { spinwheelClient } from '@/lib/spinwheel';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phoneNumber, method } = body;

    if (!phoneNumber) {
      return NextResponse.json(
        { error: 'Phone number is required' },
        { status: 400 }
      );
    }

    const result = await spinwheelClient.connectUser({
      phoneNumber,
      method: method || 'sms',
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error connecting user:', error);
    return NextResponse.json(
      { 
        error: 'Failed to connect user',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

