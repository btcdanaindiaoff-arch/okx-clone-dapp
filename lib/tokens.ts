export interface Token {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  chainId: number;
  logoURI?: string;
}

export const SUPPORTED_TOKENS: Token[] = [
  {
    address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    symbol: 'WETH',
    name: 'Wrapped Ether',
    decimals: 18,
    chainId: 1,
    logoURI: 'https://assets.coingecko.com/coins/images/2518/small/weth.png',
  },
  {
    address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    symbol: 'USDT',
    name: 'Tether USD',
    decimals: 6,
    chainId: 1,
    logoURI: 'https://assets.coingecko.com/coins/images/325/small/Tether.png',
  },
  {
    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    symbol: 'USDC',
    name: 'USD Coin',
    decimals: 6,
    chainId: 1,
    logoURI: 'https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png',
  },
  {
    address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    symbol: 'DAI',
    name: 'Dai Stablecoin',
    decimals: 18,
    chainId: 1,
    logoURI: 'https://assets.coingecko.com/coins/images/9956/small/dai-multi-collateral-mcd.png',
  },
  {
    address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
    symbol: 'WBTC',
    name: 'Wrapped Bitcoin',
    decimals: 8,
    chainId: 1,
    logoURI: 'https://assets.coingecko.com/coins/images/7598/small/wrapped_bitcoin_wbtc.png',
  },
  {
    address: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
    symbol: 'LINK',
    name: 'Chainlink',
    decimals: 18,
    chainId: 1,
    logoURI: 'https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png',
  },
  {
    address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
    symbol: 'UNI',
    name: 'Uniswap',
    decimals: 18,
    chainId: 1,
    logoURI: 'https://assets.coingecko.com/coins/images/12504/small/uniswap-uni.png',
  },
  {
    address: '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0',
    symbol: 'MATIC',
    name: 'Polygon',
    decimals: 18,
    chainId: 1,
    logoURI: 'https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png',
  },
];

// BSC Tokens
export const BSC_TOKENS: Token[] = [
  {
    address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    symbol: 'WBNB',
    name: 'Wrapped BNB',
    decimals: 18,
    chainId: 56,
  },
  {
    address: '0x55d398326f99059fF775485246999027B3197955',
    symbol: 'USDT',
    name: 'Tether USD',
    decimals: 18,
    chainId: 56,
  },
  {
    address: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
    symbol: 'BUSD',
    name: 'Binance USD',
    decimals: 18,
    chainId: 56,
  },
];

// BSC Testnet Tokens (Your Custom USDT)
export const BSC_TESTNET_TOKENS: Token[] = [
  {
    address: '0x2D974F61dEB29F8cd7D547b1aaEC540001Ab8A23',
    symbol: 'USDT',
    name: 'Binance-Peg BSC-USD',
    decimals: 18,
    chainId: 97,
    logoURI: 'https://assets.coingecko.com/coins/images/325/small/Tether.png',
  },
  {
    address: '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
    symbol: 'WBNB',
    name: 'Wrapped BNB',
    decimals: 18,
    chainId: 97,
  },
];

// Polygon Tokens
export const POLYGON_TOKENS: Token[] = [
  {
    address: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
    symbol: 'WMATIC',
    name: 'Wrapped Matic',
    decimals: 18,
    chainId: 137,
  },
  {
    address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
    symbol: 'USDT',
    name: 'Tether USD',
    decimals: 6,
    chainId: 137,
  },
  {
    address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
    symbol: 'USDC',
    name: 'USD Coin',
    decimals: 6,
    chainId: 137,
  },
];

export function getTokenByAddress(address: string, chainId: number): Token | undefined {
  const allTokens = [...SUPPORTED_TOKENS, ...BSC_TOKENS, ...BSC_TESTNET_TOKENS, ...POLYGON_TOKENS];
  return allTokens.find(
    token => token.address.toLowerCase() === address.toLowerCase() && token.chainId === chainId
  );
}

export function getTokensByChainId(chainId: number): Token[] {
  const allTokens = [...SUPPORTED_TOKENS, ...BSC_TOKENS, ...BSC_TESTNET_TOKENS, ...POLYGON_TOKENS];
  return allTokens.filter(token => token.chainId === chainId);
}

export const NATIVE_TOKEN_ADDRESS = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';
