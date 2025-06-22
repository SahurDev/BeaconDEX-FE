import { useAccount } from 'wagmi';
import { isAdmin, getAdminStatus } from '../config/admin';

// Custom hook to check admin status
export function useAdmin() {
  const { address, isConnected } = useAccount();
  
  const adminStatus = getAdminStatus(address, isConnected);
  
  // Debug logging
  if (typeof window !== 'undefined') {
    console.log('useAdmin Debug:', {
      address,
      isConnected,
      isAdmin: adminStatus.isAdmin
    });
  }
  
  return {
    address,
    isConnected,
    isAdmin: adminStatus.isAdmin,
    canCreatePools: adminStatus.canCreatePools,
    adminStatus,
  };
}