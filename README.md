# OKX Clone - Web3 Trading Platform

A full-featured decentralized trading platform built with Next.js 14, RainbowKit, Wagmi, and TypeScript. Features multi-wallet support, real-time trading charts, token swapping, and portfolio management.

![OKX Clone](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)
![License](https://img.shields.io/badge/License-MIT-green)

## Features

### Trading
- **Real-time Price Charts** - Interactive TradingView-style charts with multiple timeframes
- **Order Book** - Live buy/sell order book with depth visualization
- **Trade Execution** - Limit and market orders with customizable parameters
- **Multiple Trading Pairs** - Support for BTC, ETH, BNB, and more

### Wallet Integration
- **Multi-Wallet Support** - MetaMask, WalletConnect, Coinbase Wallet, Rainbow, and more
- **Multi-Chain** - Ethereum, BSC, Polygon, Arbitrum, Optimism, Base, Avalanche
- **Portfolio Dashboard** - Real-time balance tracking and portfolio analytics
- **Transaction History** - Complete transaction tracking and history

### Token Swap
- **DEX Integration** - Swap tokens directly through Uniswap/PancakeSwap
- **Best Rates** - Automatic routing for optimal swap rates
- **Slippage Control** - Customizable slippage tolerance
- **Gas Optimization** - Smart gas price recommendations

### User Experience
- **Dark Theme** - Beautiful OKX-inspired dark theme
- **Responsive Design** - Fully responsive on mobile, tablet, and desktop
- **Real-time Updates** - Live price feeds and order book updates
- **Persistent State** - Settings and favorites saved locally

## Tech Stack

- **Frontend Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5.3
- **Styling**: Tailwind CSS 3.4
- **Web3 Integration**: 
  - RainbowKit 2.0 (Wallet Connection)
  - Wagmi 2.5 (React Hooks for Ethereum)
  - Viem 2.7 (Ethereum Library)
  - Ethers.js 6.10
- **State Management**: Zustand 4.5
- **Data Fetching**: TanStack Query 5.20
- **Charts**: Recharts 2.12
- **Icons**: Lucide React
- **Animations**: Framer Motion

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- A WalletConnect Project ID (free at [cloud.walletconnect.com](https://cloud.walletconnect.com/))
- A Web3 wallet (MetaMask, Rainbow, etc.)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/okx-clone-dapp.git
cd okx-clone-dapp
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your WalletConnect Project ID:
```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id_here
```

4. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
okx-clone-dapp/
├── app/                      # Next.js app directory
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Home page (main dashboard)
│   ├── trade/               # Trading page
│   ├── wallet/              # Wallet dashboard
│   ├── swap/                # Token swap page
│   ├── globals.css          # Global styles
│   └── providers.tsx        # Web3 providers setup
├── components/              # React components
│   ├── Navbar.tsx          # Navigation bar
│   ├── WalletButton.tsx    # Multi-wallet connect button
│   ├── TradingChart.tsx    # Price chart component
│   ├── OrderBook.tsx       # Order book display
│   ├── TradeForm.tsx       # Buy/sell form
│   ├── TokenSwap.tsx       # Token swap interface
│   ├── Portfolio.tsx       # Portfolio display
│   └── PriceTicker.tsx     # Price ticker bar
├── hooks/                   # Custom React hooks
│   ├── useTokenBalance.ts  # Fetch token balances
│   ├── useTokenPrice.ts    # Fetch token prices
│   └── useSwap.ts          # Token swap functionality
├── lib/                     # Configuration files
│   ├── wagmi.ts            # Wagmi configuration
│   ├── chains.ts           # Blockchain configurations
│   └── tokens.ts           # Token definitions
├── store/                   # State management
│   └── useStore.ts         # Zustand store
├── utils/                   # Utility functions
│   ├── formatters.ts       # Number/address formatters
│   └── constants.ts        # App constants
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
└── README.md
```

## Key Components

### Navbar
Top navigation with wallet connection, network switcher, and responsive mobile menu.

### TradingChart
Interactive price chart with multiple timeframes (1m, 5m, 15m, 30m, 1H, 4H, 1D, 1W).

### OrderBook
Real-time order book showing buy/sell orders with depth visualization.

### TradeForm
Complete trading form with limit/market orders, balance display, and percentage shortcuts.

### TokenSwap
DEX swap interface with slippage control, gas estimation, and transaction preview.

### Portfolio
Dashboard showing wallet balances, asset distribution, and portfolio value.

## Configuration

### Supported Networks
- Ethereum Mainnet
- BNB Smart Chain
- Polygon
- Arbitrum One
- Optimism
- Base
- Avalanche

### Supported Wallets
- MetaMask
- WalletConnect
- Coinbase Wallet
- Rainbow
- Trust Wallet
- Ledger
- And more via RainbowKit

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | Yes | WalletConnect Cloud project ID |
| `NEXT_PUBLIC_ENABLE_TESTNETS` | No | Enable testnet networks |
| `NEXT_PUBLIC_ALCHEMY_API_KEY` | No | Alchemy RPC API key |
| `NEXT_PUBLIC_INFURA_API_KEY` | No | Infura RPC API key |
| `NEXT_PUBLIC_COINGECKO_API_KEY` | No | CoinGecko price API key |

## Development

### Building for Production
```bash
npm run build
npm run start
```

### Linting
```bash
npm run lint
```

### Type Checking
```bash
npx tsc --noEmit
```

## Customization

### Adding New Tokens
Edit `lib/tokens.ts`:
```typescript
export const SUPPORTED_TOKENS: Token[] = [
  {
    address: '0x...',
    symbol: 'TOKEN',
    name: 'Token Name',
    decimals: 18,
    chainId: 1,
  },
  // ... more tokens
];
```

### Adding New Trading Pairs
Edit `utils/constants.ts`:
```typescript
export const TRADING_PAIRS = [
  'BTC/USDT',
  'ETH/USDT',
  'YOUR/PAIR',
];
```

### Changing Theme Colors
Edit `app/globals.css`:
```css
:root {
  --primary: #00a6ff;
  --background: #0b0e11;
  /* ... more variables */
}
```

## Deployment

### Vercel (Recommended)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/okx-clone-dapp)

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms
This is a standard Next.js app and can be deployed to:
- Netlify
- Railway
- AWS Amplify
- Self-hosted with Docker

## Security Considerations

- Never commit `.env.local` or private keys
- Always verify contract addresses before transactions
- Use hardware wallets for large amounts
- Test on testnets first
- Review transaction details before signing

## Roadmap

- [ ] Advanced order types (stop-loss, take-profit)
- [ ] Limit order execution on-chain
- [ ] Staking and yield farming
- [ ] NFT marketplace integration
- [ ] Social trading features
- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] Advanced charting with indicators

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [RainbowKit](https://www.rainbowkit.com/) for wallet integration
- [Wagmi](https://wagmi.sh/) for React hooks
- [Recharts](https://recharts.org/) for charting
- [OKX](https://www.okx.com/) for design inspiration

## Support

For support, email support@okxclone.com or join our Discord community.

## Disclaimer

This is a demo/educational project. Always do your own research before trading cryptocurrencies. Never invest more than you can afford to lose.

---

Built with by [Your Name]

If you find this project helpful, please give it a star!
