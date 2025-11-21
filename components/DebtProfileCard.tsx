'use client';

import { Liability } from '@/lib/spinwheel';

interface DebtProfileCardProps {
  liability: Liability;
}

export default function DebtProfileCard({ liability }: DebtProfileCardProps) {
  const formatCurrency = (amount?: number) => {
    if (amount === undefined || amount === null) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'active':
      case 'current':
        return 'bg-green-100 text-green-800';
      case 'delinquent':
      case 'past due':
        return 'bg-red-100 text-red-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            {liability.accountName}
          </h3>
          {liability.accountNumber && (
            <p className="text-sm text-gray-500 mt-1">
              ****{liability.accountNumber.slice(-4)}
            </p>
          )}
        </div>
        {liability.status && (
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(liability.status)}`}>
            {liability.status}
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-600">Account Type</p>
          <p className="text-lg font-semibold text-gray-800">
            {liability.accountType}
          </p>
        </div>
        {liability.subtype && (
          <div>
            <p className="text-sm text-gray-600">Subtype</p>
            <p className="text-lg font-semibold text-gray-800">
              {liability.subtype}
            </p>
          </div>
        )}
      </div>

      <div className="border-t pt-4 space-y-3">
        {liability.balance !== undefined && (
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Current Balance</span>
            <span className="text-2xl font-bold text-gray-800">
              {formatCurrency(liability.balance)}
            </span>
          </div>
        )}
        {liability.creditLimit !== undefined && (
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Credit Limit</span>
            <span className="text-lg font-semibold text-gray-700">
              {formatCurrency(liability.creditLimit)}
            </span>
          </div>
        )}
        {liability.minimumPayment !== undefined && (
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Minimum Payment</span>
            <span className="text-lg font-semibold text-gray-700">
              {formatCurrency(liability.minimumPayment)}
            </span>
          </div>
        )}
        {liability.dueDate && (
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Due Date</span>
            <span className="text-lg font-semibold text-gray-700">
              {formatDate(liability.dueDate)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

