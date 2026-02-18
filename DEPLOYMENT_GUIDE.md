# OKX Clone dApp - Complete Deployment Guide

## 🚀 Complete Deployment Guide

This guide covers deploying your full-stack OKX clone dApp with smart contracts, frontend, and Web3 wallet integration.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Smart Contract Deployment](#smart-contract-deployment)
3. [Frontend Configuration](#frontend-configuration)
4. [Deployment Options](#deployment-options)
5. [Post-Deployment Setup](#post-deployment-setup)
6. [Testing Your dApp](#testing-your-dapp)

---

## Prerequisites

### Required Accounts & Keys

1. **WalletConnect Project ID**
   - Visit: https://cloud.walletconnect.com
   - Create new project
   - Copy your Project ID

2. **Wallet Private Key**
   - Your deployer wallet private key: `0x8158ad2c3752c6521f372d8493efcbc9a84a4801a9ab2693c1d30557da0d6f0e`
   - Wallet Address: `0x5ceEf39DFc84d0216214C052115F559bb48a9C6d`
   - Network: BSC Testnet (has BNB balance)

3. **BSC Testnet Faucet** (if more BNB needed)
   - https://testnet.binance.org/faucet-smart
   - Get free testnet BNB for gas fees

4. **Your Deployed Tokens**
   - TestUSDT: `0x2D974F61dEB29F8cd7D547b1aaEC540001Ab8A23`
   - Network: BSC Testnet (Chain ID: 97)

### Software Requirements

```bash
# Install Node.js (v18 or higher)
node --version  # Should be v18+

# Install npm packages globally (optional)
npm install -g vercel  # For Vercel deployment
```

---

## Smart Contract Deployment

### Step 1: Deploy SimpleDEX Contract

Navigate to contracts directory:

```bash
cd code/okx-clone-dapp/contracts
```

### Option A: Using thirdweb (Recommended)

1. **Install dependencies:**
```bash
npm install
```

2. **Set environment variables:**
```bash
# Create .env file
cat > .env << EOF
THIRDWEB_SECRET_KEY=your_thirdweb_secret_key
DEPLOYER_PRIVATE_KEY=8158ad2c3752c6521f372d8493efcbc9a84a4801a9ab2693c1d30557da0d6f0e
TOKEN1_ADDRESS=0x2D974F61dEB29F8cd7D547b1aaEC540001Ab8A23
TOKEN2_ADDRESS=0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd
EOF
```

3. **Deploy:**
```bash
npm run deploy
```

4. **Save the contract address** from deployment output

### Option B: Using Hardhat

1. **Create hardhat.config.ts:**
```typescript
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    bscTestnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      accounts: ["0x8158ad2c3752c6521f372d8493efcbc9a84a4801a9ab2693c1d30557da0d6f0e"]
    }
  }
};

export default config;
```

2. **Deploy:**
```bash
npx hardhat run deploy-SimpleDEX.ts --network bscTestnet
```

### Step 2: Verify Contract (Optional)

```bash
npx hardhat verify --network bscTestnet <CONTRACT_ADDRESS>
```

---

## Frontend Configuration

### Step 1: Install Dependencies

Navigate to main dApp directory:

```bash
cd code/okx-clone-dapp
npm install
```

### Step 2: Configure Environment Variables

Create `.env.local` file:

```bash
cat > .env.local << EOF
# WalletConnect Project ID (Required)
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id

# Your Deployed SimpleDEX Contract Address
NEXT_PUBLIC_DEX_CONTRACT_ADDRESS=0xYourSimpleDEXContractAddress

# BSC Testnet RPC (Optional - uses public RPC by default)
NEXT_PUBLIC_BSC_TESTNET_RPC=https://data-seed-prebsc-1-s1.binance.org:8545

# Analytics (Optional)
NEXT_PUBLIC_GA_TRACKING_ID=
EOF
```

### Step 3: Update Contract Addresses

Edit `lib/tokens.ts` to ensure your USDT address is correct:

```typescript
// BSC Testnet Tokens (Your Custom USDT)
export const BSC_TESTNET_TOKENS: Token[] = [
  {
    address: '0x2D974F61dEB29F8cd7D547b1aaEC540001Ab8A23', // ✓ Already configured
    symbol: 'USDT',
    name: 'Binance-Peg BSC-USD',
    decimals: 18,
    chainId: 97,
    logoURI: 'https://assets.coingecko.com/coins/images/325/small/Tether.png',
  },
];
```

### Step 4: Add SimpleDEX Contract ABI

Create `lib/abis/SimpleDEX.json`:

```json
{
  "abi": [
    "function addLiquidity(address token1, address token2, uint256 amount1, uint256 amount2, uint256 minLiquidity, uint256 deadline) external returns (uint256 liquidity)",
    "function removeLiquidity(address token1, address token2, uint256 liquidity, uint256 minAmount1, uint256 minAmount2, uint256 deadline) external returns (uint256 amount1, uint256 amount2)",
    "function swap(address tokenIn, address tokenOut, uint256 amountIn, uint256 minAmountOut, uint256 deadline) external returns (uint256 amountOut)",
    "function getReserves(address token1, address token2) external view returns (uint256 reserve1, uint256 reserve2)",
    "function getAmountOut(uint256 amountIn, uint256 reserveIn, uint256 reserveOut) external pure returns (uint256 amountOut)"
  ]
}
```

### Step 5: Test Locally

```bash
npm run dev
```

Visit: http://localhost:3000

---

## Deployment Options

### Option 1: Vercel (Recommended - Free)

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Login to Vercel:**
```bash
vercel login
```

3. **Deploy:**
```bash
vercel
```

4. **Set environment variables in Vercel dashboard:**
   - Go to: https://vercel.com/your-project/settings/environment-variables
   - Add: `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`
   - Add: `NEXT_PUBLIC_DEX_CONTRACT_ADDRESS`

5. **Redeploy:**
```bash
vercel --prod
```

**Your dApp will be live at:** `https://your-project.vercel.app`

### Option 2: Netlify

1. **Install Netlify CLI:**
```bash
npm install -g netlify-cli
```

2. **Build:**
```bash
npm run build
```

3. **Deploy:**
```bash
netlify deploy --prod --dir=.next
```

4. **Configure environment variables** in Netlify dashboard

### Option 3: Self-Hosted (VPS/Server)

1. **Build production bundle:**
```bash
npm run build
```

2. **Start production server:**
```bash
npm start
```

3. **Use PM2 for process management:**
```bash
npm install -g pm2
pm2 start npm --name "okx-clone" -- start
pm2 save
pm2 startup
```

4. **Configure Nginx reverse proxy:**
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Option 4: IPFS (Decentralized Hosting)

1. **Install Fleek CLI:**
```bash
npm install -g @fleek-platform/cli
```

2. **Build static export:**
```bash
# Add to next.config.js:
output: 'export',
images: { unoptimized: true }
```

3. **Build:**
```bash
npm run build
```

4. **Deploy to IPFS:**
```bash
fleek sites deploy
```

---

## Post-Deployment Setup

### 1. Add Liquidity to Your DEX

Use the deployed SimpleDEX contract to add initial liquidity:

```bash
cd contracts
npm run interact
# Select: "Add Liquidity"
# Follow prompts to add USDT/WBNB pair
```

Or use the frontend `/swap` page after deployment.

### 2. Configure Contract in dApp

Update `utils/constants.ts`:

```typescript
export const CONTRACTS = {
  SimpleDEX: {
    97: '0xYourDeployedSimpleDEXAddress', // BSC Testnet
  },
};
```

### 3. Test All Features

- ✅ Wallet Connection (MetaMask, Trust Wallet, WalletConnect)
- ✅ Token Swap
- ✅ Add/Remove Liquidity
- ✅ Portfolio View
- ✅ Trading Interface
- ✅ Multi-chain Support

### 4. Update DNS (Optional)

If using custom domain:

1. **Vercel:**
   - Add domain in Vercel dashboard
   - Update DNS records at your domain registrar

2. **Self-hosted:**
   - Point A record to your server IP
   - Configure SSL with Let's Encrypt:
   ```bash
   sudo certbot --nginx -d your-domain.com
   ```

---

## Testing Your dApp

### Frontend Testing Checklist

1. **Wallet Connection**
   ```
   ✓ MetaMask connects
   ✓ Trust Wallet connects via WalletConnect
   ✓ Network switching works
   ✓ Account switching detected
   ```

2. **Token Operations**
   ```
   ✓ View token balances
   ✓ Approve token spending
   ✓ Swap tokens (USDT/WBNB)
   ✓ Add liquidity
   ✓ Remove liquidity
   ```

3. **UI/UX**
   ```
   ✓ Responsive design (mobile/desktop)
   ✓ Dark theme renders correctly
   ✓ Charts display properly
   ✓ Order book updates
   ✓ Price ticker works
   ```

### Smart Contract Testing

```bash
cd contracts
npx hardhat test
```

### Load Testing (Optional)

```bash
npm install -g artillery
artillery quick --count 10 --num 100 https://your-dapp.vercel.app
```

---

## Troubleshooting

### Common Issues

**1. "Network mismatch" error**
- Ensure wallet is on BSC Testnet (Chain ID: 97)
- Check `.env.local` has correct RPC URL

**2. "Insufficient gas" error**
- Get more testnet BNB: https://testnet.binance.org/faucet-smart
- Check wallet balance

**3. Wallet won't connect**
- Verify `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` is set
- Clear browser cache
- Try different browser

**4. Contract interaction fails**
- Verify contract address in `.env.local`
- Check token approvals
- Ensure SimpleDEX has liquidity

**5. Build errors**
- Delete `.next` folder and `node_modules`
- Run `npm install` again
- Check Node.js version (should be v18+)

### Debug Mode

Enable debug logging:

```bash
# .env.local
NEXT_PUBLIC_DEBUG=true
```

---

## Performance Optimization

### Production Checklist

1. **Enable image optimization:**
```javascript
// next.config.js
images: {
  domains: ['assets.coingecko.com', 'raw.githubusercontent.com'],
  formats: ['image/avif', 'image/webp'],
}
```

2. **Enable caching:**
```javascript
// next.config.js
headers: async () => [
  {
    source: '/:all*(svg|jpg|png)',
    headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
  },
]
```

3. **Analyze bundle:**
```bash
npm run build
npx @next/bundle-analyzer
```

---

## Security Best Practices

### Frontend Security

1. **Never commit `.env.local`** to Git
2. **Use environment variables** for all sensitive data
3. **Enable CSP headers** in production
4. **Validate all user inputs** before contract calls
5. **Use HTTPS** in production

### Smart Contract Security

1. **Audit contract** before mainnet deployment
2. **Test extensively** on testnet
3. **Use timelock** for admin functions
4. **Implement pause mechanism** for emergencies
5. **Monitor contract** for suspicious activity

---

## Monitoring & Analytics

### Add Google Analytics

```javascript
// app/layout.tsx
import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`} />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

### Error Tracking with Sentry

```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

---

## Maintenance

### Regular Updates

1. **Update dependencies monthly:**
```bash
npm outdated
npm update
```

2. **Security audits:**
```bash
npm audit
npm audit fix
```

3. **Monitor gas prices** and optimize contracts

4. **Backup contract data** and important transactions

---

## Cost Breakdown

### Deployment Costs

- **Smart Contract Deployment:** ~0.001 BNB ($0.30)
- **Frontend Hosting (Vercel):** Free tier
- **Domain Name:** $10-15/year (optional)
- **SSL Certificate:** Free (Let's Encrypt)

### Ongoing Costs

- **Vercel Pro (optional):** $20/month
- **RPC Provider (optional):** Free tier (Alchemy/Infura)
- **Total Minimum:** $0/month (using free tiers)

---

## Quick Start Commands

```bash
# 1. Deploy Smart Contract
cd code/okx-clone-dapp/contracts
npm install
npm run deploy

# 2. Configure Frontend
cd ..
cp .env.example .env.local
# Edit .env.local with your values

# 3. Install & Test
npm install
npm run dev

# 4. Deploy to Vercel
vercel --prod
```

---

## Support & Resources

- **Smart Contract Code:** `code/okx-clone-dapp/contracts/SimpleDEX.sol`
- **Frontend Code:** `code/okx-clone-dapp/`
- **Contract Documentation:** `code/okx-clone-dapp/contracts/README.md`
- **BSC Testnet Explorer:** https://testnet.bscscan.com
- **Your USDT Token:** https://testnet.bscscan.com/address/0x2D974F61dEB29F8cd7D547b1aaEC540001Ab8A23

---

## Next Steps

1. ✅ Deploy SimpleDEX contract to BSC Testnet
2. ✅ Add initial liquidity (USDT/WBNB pair)
3. ✅ Configure frontend environment variables
4. ✅ Deploy frontend to Vercel
5. ✅ Test all wallet connections
6. ✅ Share your dApp URL!

**Your complete OKX clone is ready to deploy! 🚀**
