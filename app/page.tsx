'use client';

import { useState, useEffect } from 'react';
import ConnectUserForm from '@/components/ConnectUserForm';
import LiabilityList from '@/components/LiabilityList';
import { DebtProfile } from '@/lib/spinwheel';

export default function Home() {
  const [userId, setUserId] = useState<string | null>(null);
  const [debtProfile, setDebtProfile] = useState<DebtProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if userId is stored in localStorage
    const storedUserId = localStorage.getItem('spinwheel_userId');
    if (storedUserId) {
      setUserId(storedUserId);
      fetchDebtProfile(storedUserId);
    }
  }, []);

  const handleConnect = (newUserId: string) => {
    setUserId(newUserId);
    localStorage.setItem('spinwheel_userId', newUserId);
    fetchDebtProfile(newUserId);
  };

  const fetchDebtProfile = async (targetUserId: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/debt-profile?userId=${targetUserId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || data.error || 'Failed to fetch debt profile');
      }

      setDebtProfile(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = () => {
    setUserId(null);
    setDebtProfile(null);
    localStorage.removeItem('spinwheel_userId');
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Spinwheel Debt Profile Dashboard
          </h1>
          <p className="text-gray-600">
            Connect a user and view their debt profile and liabilities
          </p>
        </header>

        {!userId ? (
          <div className="max-w-md mx-auto">
            <ConnectUserForm onConnect={handleConnect} />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">Connected User ID</p>
                <p className="text-lg font-semibold text-gray-800">{userId}</p>
              </div>
              <button
                onClick={handleDisconnect}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Disconnect
              </button>
            </div>

            {loading && (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="mt-4 text-gray-600">Loading debt profile...</p>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
                <p className="font-semibold">Error</p>
                <p>{error}</p>
              </div>
            )}

            {debtProfile && !loading && (
              <LiabilityList
                liabilities={debtProfile.liabilities || []}
                totalBalance={debtProfile.totalBalance}
              />
            )}

            {!loading && !error && debtProfile && (
              <div className="text-center">
                <button
                  onClick={() => fetchDebtProfile(userId)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Refresh Debt Profile
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

