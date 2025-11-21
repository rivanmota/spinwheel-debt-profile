'use client';

import { Liability } from '@/lib/spinwheel';
import DebtProfileCard from './DebtProfileCard';

interface LiabilityListProps {
  liabilities: Liability[];
  totalBalance?: number;
}

export default function LiabilityList({ liabilities, totalBalance }: LiabilityListProps) {
  const formatCurrency = (amount?: number) => {
    if (amount === undefined || amount === null) return '$0.00';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  if (liabilities.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <p className="text-gray-500 text-lg">No liabilities found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {totalBalance !== undefined && (
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg p-6 text-white">
          <h3 className="text-sm font-medium mb-2 opacity-90">Total Debt Balance</h3>
          <p className="text-4xl font-bold">{formatCurrency(totalBalance)}</p>
        </div>
      )}

      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Liabilities ({liabilities.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {liabilities.map((liability) => (
            <DebtProfileCard key={liability.id} liability={liability} />
          ))}
        </div>
      </div>
    </div>
  );
}

