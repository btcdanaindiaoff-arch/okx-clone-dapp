export const SUPPORTED_CHAINS = {
  ethereum: {
    id: 1,
    name: 'Ethereum',
    network: 'mainnet',
    nativeCurrency: {
      decimals: 18,
      name: 'Ether',
      symbol: 'ETH',
    },
    rpcUrls: {
      default: { http: ['https://eth.llamarpc.com'] },
      public: { http: ['https://eth.llamarpc.com'] },
    },
    blockExplorers: {
      default: { name: 'Etherscan', url: 'https://etherscan.io' },
    },
  },
  bsc: {
    id: 56,
    name: 'BNB Smart Chain',
    network: 'bsc',
    nativeCurrency: {
      decimals: 18,
      name: 'BNB',
      symbol: 'BNB',
    },
    rpcUrls: {
      default: { http: ['https://bsc-dataseed.binance.org'] },
      public: { http: ['https://bsc-dataseed.binance.org'] },
    },
    blockExplorers: {
      default: { name: 'BscScan', url: 'https://bscscan.com' },
    },
  },
  polygon: {
    id: 137,
    name: 'Polygon',
    network: 'polygon',
    nativeCurrency: {
      decimals: 18,
      name: 'MATIC',
      symbol: 'MATIC',
    },
    rpcUrls: {
      default: { http: ['https://polygon-rpc.com'] },
      public: { http: ['https://polygon-rpc.com'] },
    },
    blockExplorers: {
      default: { name: 'PolygonScan', url: 'https://polygonscan.com' },
    },
  },
  arbitrum: {
    id: 42161,
    name: 'Arbitrum One',
    network: 'arbitrum',
    nativeCurrency: {
      decimals: 18,
      name: 'Ether',
      symbol: 'ETH',
    },
    rpcUrls: {
      default: { http: ['https://arb1.arbitrum.io/rpc'] },
      public: { http: ['https://arb1.arbitrum.io/rpc'] },
    },
    blockExplorers: {
      default: { name: 'Arbiscan', url: 'https://arbiscan.io' },
    },
  },
  optimism: {
    id: 10,
    name: 'Optimism',
    network: 'optimism',
    nativeCurrency: {
      decimals: 18,
      name: 'Ether',
      symbol: 'ETH',
    },
    rpcUrls: {
      default: { http: ['https://mainnet.optimism.io'] },
      public: { http: ['https://mainnet.optimism.io'] },
    },
    blockExplorers: {
      default: { name: 'Optimistic Etherscan', url: 'https://optimistic.etherscan.io' },
    },
  },
  base: {
    id: 8453,
    name: 'Base',
    network: 'base',
    nativeCurrency: {
      decimals: 18,
      name: 'Ether',
      symbol: 'ETH',
    },
    rpcUrls: {
      default: { http: ['https://mainnet.base.org'] },
      public: { http: ['https://mainnet.base.org'] },
    },
    blockExplorers: {
      default: { name: 'BaseScan', url: 'https://basescan.org' },
    },
  },
  avalanche: {
    id: 43114,
    name: 'Avalanche',
    network: 'avalanche',
    nativeCurrency: {
      decimals: 18,
      name: 'AVAX',
      symbol: 'AVAX',
    },
    rpcUrls: {
      default: { http: ['https://api.avax.network/ext/bc/C/rpc'] },
      public: { http: ['https://api.avax.network/ext/bc/C/rpc'] },
    },
    blockExplorers: {
      default: { name: 'SnowTrace', url: 'https://snowtrace.io' },
    },
  },
  bscTestnet: {
    id: 97,
    name: 'BSC Testnet',
    network: 'bsc-testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'tBNB',
      symbol: 'tBNB',
    },
    rpcUrls: {
      default: { http: ['https://data-seed-prebsc-1-s1.binance.org:8545'] },
      public: { http: ['https://data-seed-prebsc-1-s1.binance.org:8545'] },
    },
    blockExplorers: {
      default: { name: 'BscScan Testnet', url: 'https://testnet.bscscan.com' },
    },
    testnet: true,
  },
} as const;

export type SupportedChainId = keyof typeof SUPPORTED_CHAINS;

export function getChainById(chainId: number) {
  return Object.values(SUPPORTED_CHAINS).find(chain => chain.id === chainId);
}

export function getChainByName(name: string) {
  return SUPPORTED_CHAINS[name.toLowerCase() as SupportedChainId];
}
