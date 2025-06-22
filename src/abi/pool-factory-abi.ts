export const PoolFactoryAbi = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_implementation",
        type: "address",
        internalType: "address",
      },
      {
        name: "_protocolVault",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "allPools",
    inputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "allPoolsLength",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "beacon",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract UpgradeableBeacon",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "createPool",
    inputs: [
      { name: "_token0", type: "address", internalType: "address" },
      { name: "_token1", type: "address", internalType: "address" },
      { name: "_oracle0", type: "address", internalType: "address" },
      { name: "_oracle1", type: "address", internalType: "address" },
    ],
    outputs: [{ name: "pool", type: "address", internalType: "address" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getPair",
    inputs: [
      { name: "", type: "address", internalType: "address" },
      { name: "", type: "address", internalType: "address" },
    ],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getPool",
    inputs: [
      { name: "_token0", type: "address", internalType: "address" },
      { name: "_token1", type: "address", internalType: "address" },
    ],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "implementation",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "protocolVault",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "renounceOwnership",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "transferOwnership",
    inputs: [{ name: "newOwner", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "upgradeBeacon",
    inputs: [
      {
        name: "_newImplementation",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "BeaconUpgraded",
    inputs: [
      {
        name: "newImplementation",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OwnershipTransferred",
    inputs: [
      {
        name: "previousOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "newOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "PoolCreated",
    inputs: [
      {
        name: "token0",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "token1",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "oracle0",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "oracle1",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "symbol0",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "symbol1",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "pool",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "poolIndex",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "OwnableInvalidOwner",
    inputs: [{ name: "owner", type: "address", internalType: "address" }],
  },
  {
    type: "error",
    name: "OwnableUnauthorizedAccount",
    inputs: [{ name: "account", type: "address", internalType: "address" }],
  },
] as const;
