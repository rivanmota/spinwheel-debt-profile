import { NextRequest, NextResponse } from 'next/server';
import { spinwheelClient } from '@/lib/spinwheel';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phoneNumber, dateOfBirth, extUserId } = body;

    if (!phoneNumber || !dateOfBirth || !extUserId) {
      return NextResponse.json(
        { error: 'Phone number, date of birth, and extUserId are required' },
        { status: 400 }
      );
    }

    const result = await spinwheelClient.initiateSMSConnection({
      phoneNumber,
      dateOfBirth,
      extUserId,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error initiating SMS connection:', error);
    return NextResponse.json(
      { 
        error: 'Failed to initiate SMS connection',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

