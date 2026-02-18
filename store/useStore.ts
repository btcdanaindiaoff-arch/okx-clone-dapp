import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Trade {
  id: string;
  pair: string;
  side: 'buy' | 'sell';
  price: number;
  amount: number;
  total: number;
  timestamp: number;
  status: 'pending' | 'completed' | 'failed';
}

interface Order {
  id: string;
  pair: string;
  type: 'limit' | 'market';
  side: 'buy' | 'sell';
  price?: number;
  amount: number;
  filled: number;
  status: 'open' | 'filled' | 'cancelled';
  timestamp: number;
}

interface StoreState {
  // Trading
  selectedPair: string;
  setSelectedPair: (pair: string) => void;
  
  // Orders
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'timestamp'>) => void;
  cancelOrder: (orderId: string) => void;
  
  // Trade History
  trades: Trade[];
  addTrade: (trade: Omit<Trade, 'id' | 'timestamp'>) => void;
  
  // Favorites
  favorites: string[];
  addFavorite: (pair: string) => void;
  removeFavorite: (pair: string) => void;
  
  // Settings
  settings: {
    slippage: number;
    gasPrice: 'low' | 'medium' | 'high';
    theme: 'dark' | 'light';
    notifications: boolean;
  };
  updateSettings: (settings: Partial<StoreState['settings']>) => void;
  
  // Portfolio
  portfolioView: 'value' | 'percentage';
  setPortfolioView: (view: 'value' | 'percentage') => void;
  
  // Chart
  chartTimeframe: string;
  setChartTimeframe: (timeframe: string) => void;
  
  // Clear functions
  clearOrders: () => void;
  clearTrades: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      // Trading
      selectedPair: 'BTC/USDT',
      setSelectedPair: (pair) => set({ selectedPair: pair }),
      
      // Orders
      orders: [],
      addOrder: (order) =>
        set((state) => ({
          orders: [
            {
              ...order,
              id: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
              timestamp: Date.now(),
              filled: 0,
              status: 'open',
            },
            ...state.orders,
          ],
        })),
      cancelOrder: (orderId) =>
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === orderId ? { ...order, status: 'cancelled' as const } : order
          ),
        })),
      
      // Trade History
      trades: [],
      addTrade: (trade) =>
        set((state) => ({
          trades: [
            {
              ...trade,
              id: `trade_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
              timestamp: Date.now(),
            },
            ...state.trades,
          ].slice(0, 100), // Keep only last 100 trades
        })),
      
      // Favorites
      favorites: ['BTC/USDT', 'ETH/USDT'],
      addFavorite: (pair) =>
        set((state) => ({
          favorites: state.favorites.includes(pair)
            ? state.favorites
            : [...state.favorites, pair],
        })),
      removeFavorite: (pair) =>
        set((state) => ({
          favorites: state.favorites.filter((f) => f !== pair),
        })),
      
      // Settings
      settings: {
        slippage: 0.5,
        gasPrice: 'medium',
        theme: 'dark',
        notifications: true,
      },
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),
      
      // Portfolio
      portfolioView: 'value',
      setPortfolioView: (view) => set({ portfolioView: view }),
      
      // Chart
      chartTimeframe: '1H',
      setChartTimeframe: (timeframe) => set({ chartTimeframe: timeframe }),
      
      // Clear functions
      clearOrders: () => set({ orders: [] }),
      clearTrades: () => set({ trades: [] }),
    }),
    {
      name: 'okx-clone-storage',
      partialize: (state) => ({
        favorites: state.favorites,
        settings: state.settings,
        selectedPair: state.selectedPair,
        chartTimeframe: state.chartTimeframe,
        portfolioView: state.portfolioView,
      }),
    }
  )
);
