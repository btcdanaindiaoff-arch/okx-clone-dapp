/**
 * Application Constants
 */

// Trading Pairs
export const TRADING_PAIRS = [
  'BTC/USDT',
  'ETH/USDT',
  'BNB/USDT',
  'SOL/USDT',
  'ADA/USDT',
  'XRP/USDT',
  'DOT/USDT',
  'MATIC/USDT',
  'AVAX/USDT',
  'LINK/USDT',
  'UNI/USDT',
  'ATOM/USDT',
] as const;

export type TradingPair = typeof TRADING_PAIRS[number];

// Chart Timeframes
export const CHART_TIMEFRAMES = [
  { value: '1m', label: '1m', seconds: 60 },
  { value: '5m', label: '5m', seconds: 300 },
  { value: '15m', label: '15m', seconds: 900 },
  { value: '30m', label: '30m', seconds: 1800 },
  { value: '1H', label: '1H', seconds: 3600 },
  { value: '4H', label: '4H', seconds: 14400 },
  { value: '1D', label: '1D', seconds: 86400 },
  { value: '1W', label: '1W', seconds: 604800 },
] as const;

// Order Types
export const ORDER_TYPES = ['limit', 'market', 'stop-limit', 'stop-market'] as const;
export type OrderType = typeof ORDER_TYPES[number];

// Order Sides
export const ORDER_SIDES = ['buy', 'sell'] as const;
export type OrderSide = typeof ORDER_SIDES[number];

// Slippage Options
export const SLIPPAGE_OPTIONS = [0.1, 0.5, 1.0, 2.0, 5.0] as const;

// Gas Price Options
export const GAS_PRICE_OPTIONS = {
  low: { label: 'Low', multiplier: 0.8 },
  medium: { label: 'Medium', multiplier: 1.0 },
  high: { label: 'High', multiplier: 1.2 },
} as const;

// Network Configuration
export const NETWORK_CONFIGS = {
  mainnet: {
    chainId: 1,
    name: 'Ethereum Mainnet',
    rpcUrl: 'https://eth.llamarpc.com',
    blockExplorer: 'https://etherscan.io',
  },
  bsc: {
    chainId: 56,
    name: 'BNB Smart Chain',
    rpcUrl: 'https://bsc-dataseed.binance.org',
    blockExplorer: 'https://bscscan.com',
  },
  polygon: {
    chainId: 137,
    name: 'Polygon',
    rpcUrl: 'https://polygon-rpc.com',
    blockExplorer: 'https://polygonscan.com',
  },
  arbitrum: {
    chainId: 42161,
    name: 'Arbitrum One',
    rpcUrl: 'https://arb1.arbitrum.io/rpc',
    blockExplorer: 'https://arbiscan.io',
  },
  optimism: {
    chainId: 10,
    name: 'Optimism',
    rpcUrl: 'https://mainnet.optimism.io',
    blockExplorer: 'https://optimistic.etherscan.io',
  },
} as const;

// DEX Router Addresses
export const DEX_ROUTERS = {
  uniswapV2: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
  uniswapV3: '0xE592427A0AEce92De3Edee1F18E0157C05861564',
  pancakeSwap: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
  sushiSwap: '0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F',
} as const;

// Common Token Addresses (Ethereum Mainnet)
export const TOKEN_ADDRESSES = {
  WETH: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  USDC: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  DAI: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  WBTC: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
  LINK: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
  UNI: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
} as const;

// Transaction Status
export const TX_STATUS = {
  PENDING: 'pending',
  SUCCESS: 'success',
  FAILED: 'failed',
} as const;

// API Endpoints (for external data)
export const API_ENDPOINTS = {
  coingecko: 'https://api.coingecko.com/api/v3',
  etherscan: 'https://api.etherscan.io/api',
  bscscan: 'https://api.bscscan.com/api',
  polygonscan: 'https://api.polygonscan.com/api',
} as const;

// Pagination
export const ITEMS_PER_PAGE = {
  trades: 50,
  orders: 25,
  transactions: 20,
} as const;

// Refresh Intervals (in milliseconds)
export const REFRESH_INTERVALS = {
  price: 5000,          // 5 seconds
  balance: 10000,       // 10 seconds
  orders: 3000,         // 3 seconds
  chart: 60000,         // 1 minute
} as const;

// Minimum Values
export const MIN_VALUES = {
  tradeAmount: 0.0001,
  swapAmount: 0.01,
  gasPrice: 1,
} as const;

// Maximum Values
export const MAX_VALUES = {
  slippage: 50,
  gasPriceGwei: 1000,
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  theme: 'okx-clone-theme',
  slippage: 'okx-clone-slippage',
  gasPrice: 'okx-clone-gas-price',
  favorites: 'okx-clone-favorites',
  recentTrades: 'okx-clone-recent-trades',
  settings: 'okx-clone-settings',
} as const;

// Feature Flags
export const FEATURES = {
  enableTestnets: process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true',
  enableAdvancedTrading: true,
  enableStaking: false,
  enableNFTs: false,
} as const;

// Social Links
export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/okx',
  discord: 'https://discord.gg/okx',
  telegram: 'https://t.me/okx',
  github: 'https://github.com/okx',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  WALLET_NOT_CONNECTED: 'Please connect your wallet',
  INSUFFICIENT_BALANCE: 'Insufficient balance',
  INVALID_AMOUNT: 'Invalid amount',
  TRANSACTION_FAILED: 'Transaction failed',
  NETWORK_ERROR: 'Network error occurred',
  APPROVAL_FAILED: 'Token approval failed',
  SWAP_FAILED: 'Swap transaction failed',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  TRANSACTION_SUBMITTED: 'Transaction submitted successfully',
  APPROVAL_SUCCESS: 'Token approved successfully',
  SWAP_SUCCESS: 'Swap completed successfully',
  ORDER_PLACED: 'Order placed successfully',
} as const;

// App Metadata
export const APP_METADATA = {
  name: 'OKX Clone',
  description: 'Full-featured decentralized trading platform',
  version: '1.0.0',
  author: 'Your Name',
  support_email: 'support@okxclone.com',
} as const;

// Default Settings
export const DEFAULT_SETTINGS = {
  slippage: 0.5,
  gasPrice: 'medium' as const,
  theme: 'dark' as const,
  notifications: true,
  soundEffects: false,
  chartType: 'area' as const,
  orderBookDepth: 20,
} as const;
