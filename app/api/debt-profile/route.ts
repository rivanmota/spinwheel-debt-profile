import { NextRequest, NextResponse } from 'next/server';
import { spinwheelClient } from '@/lib/spinwheel';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'userId is required' },
        { status: 400 }
      );
    }

    const debtProfile = await spinwheelClient.getDebtProfile(userId);

    return NextResponse.json(debtProfile);
  } catch (error) {
    console.error('Error fetching debt profile:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch debt profile',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

