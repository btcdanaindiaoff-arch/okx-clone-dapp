import { useState, useEffect } from 'react';
import axios from 'axios';

interface PriceData {
  usd: number;
  usd_24h_change: number;
  usd_24h_vol: number;
  usd_market_cap: number;
}

interface TokenPriceResult {
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
}

export function useTokenPrice(
  tokenSymbol: string,
  options?: { refreshInterval?: number }
): TokenPriceResult {
  const [data, setData] = useState<PriceData>({
    usd: 0,
    usd_24h_change: 0,
    usd_24h_vol: 0,
    usd_market_cap: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchPrice = async () => {
    try {
      setIsLoading(true);
      setIsError(false);

      // Map common token symbols to CoinGecko IDs
      const tokenIdMap: { [key: string]: string } = {
        BTC: 'bitcoin',
        ETH: 'ethereum',
        USDT: 'tether',
        USDC: 'usd-coin',
        BNB: 'binancecoin',
        MATIC: 'matic-network',
        AVAX: 'avalanche-2',
        SOL: 'solana',
        ADA: 'cardano',
        DOT: 'polkadot',
        LINK: 'chainlink',
        UNI: 'uniswap',
        WBTC: 'wrapped-bitcoin',
        DAI: 'dai',
      };

      const tokenId = tokenIdMap[tokenSymbol.toUpperCase()] || tokenSymbol.toLowerCase();

      // Mock data for demo purposes (replace with real API in production)
      const mockPrices: { [key: string]: PriceData } = {
        bitcoin: { usd: 45000, usd_24h_change: 2.5, usd_24h_vol: 25000000000, usd_market_cap: 880000000000 },
        ethereum: { usd: 2500, usd_24h_change: 3.2, usd_24h_vol: 12000000000, usd_market_cap: 300000000000 },
        tether: { usd: 1.0, usd_24h_change: 0.01, usd_24h_vol: 50000000000, usd_market_cap: 90000000000 },
        'usd-coin': { usd: 1.0, usd_24h_change: -0.01, usd_24h_vol: 4000000000, usd_market_cap: 25000000000 },
        binancecoin: { usd: 320, usd_24h_change: -1.5, usd_24h_vol: 1500000000, usd_market_cap: 48000000000 },
      };

      const priceData = mockPrices[tokenId] || {
        usd: Math.random() * 100,
        usd_24h_change: (Math.random() - 0.5) * 10,
        usd_24h_vol: Math.random() * 1000000000,
        usd_market_cap: Math.random() * 10000000000,
      };

      setData(priceData);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching token price:', error);
      setIsError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPrice();

    if (options?.refreshInterval) {
      const interval = setInterval(fetchPrice, options.refreshInterval);
      return () => clearInterval(interval);
    }
  }, [tokenSymbol, options?.refreshInterval]);

  return {
    price: data.usd,
    change24h: data.usd_24h_change,
    volume24h: data.usd_24h_vol,
    marketCap: data.usd_market_cap,
    isLoading,
    isError,
    refetch: fetchPrice,
  };
}

// Hook for fetching multiple token prices
export function useTokenPrices(tokenSymbols: string[]) {
  const [prices, setPrices] = useState<{ [symbol: string]: PriceData }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        setIsLoading(true);
        setIsError(false);

        const priceData: { [symbol: string]: PriceData } = {};
        
        // Mock implementation
        tokenSymbols.forEach(symbol => {
          priceData[symbol] = {
            usd: Math.random() * 1000,
            usd_24h_change: (Math.random() - 0.5) * 10,
            usd_24h_vol: Math.random() * 1000000000,
            usd_market_cap: Math.random() * 10000000000,
          };
        });

        setPrices(priceData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching token prices:', error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    if (tokenSymbols.length > 0) {
      fetchPrices();
    }
  }, [tokenSymbols.join(',')]);

  return { prices, isLoading, isError };
}
