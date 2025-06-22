'use client';

import PoolFactoryConnection from './PoolFactoryConnection';
import AdminOnlySection from './AdminOnlySection';

export default function AdminPoolManagement() {
  return (
    <AdminOnlySection>
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Pool Management Dashboard</h2>
          <p className="text-gray-400">Admin-only section for creating and managing liquidity pools</p>
        </div>
        <PoolFactoryConnection />
      </div>
    </AdminOnlySection>
  );
}