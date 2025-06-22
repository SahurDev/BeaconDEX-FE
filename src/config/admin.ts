import { Address } from "viem";

// Admin wallet addresses - only these addresses can create pools
export const ADMIN_ADDRESSES: Address[] = [
  "0x0000000000000000000000000000000000000000".toLowerCase() as Address, // Normalize to lowercase
  // Add more admin addresses here (make sure they're lowercase)
];

// Check if an address is an admin
export const isAdmin = (address: Address | undefined): boolean => {
  if (!address) return false;
  // Normalize both addresses to lowercase for comparison
  const normalizedAddress = address.toLowerCase();
  console.log("Admin check:", {
    inputAddress: normalizedAddress,
    adminAddresses: ADMIN_ADDRESSES,
    isMatch: ADMIN_ADDRESSES.includes(normalizedAddress as Address),
  });
  return ADMIN_ADDRESSES.includes(normalizedAddress as Address);
};

// Get admin status with loading state
export const getAdminStatus = (
  address: Address | undefined,
  isConnected: boolean
) => {
  return {
    isAdmin: isAdmin(address),
    isConnected,
    canCreatePools: isConnected && isAdmin(address),
  };
};
