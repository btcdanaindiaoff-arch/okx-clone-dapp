/**
 * Format a number as USD currency
 */
export function formatUSD(value: number, decimals: number = 2): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/**
 * Format a number with commas and specified decimals
 */
export function formatNumber(value: number, decimals: number = 2): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/**
 * Format large numbers with K, M, B suffixes
 */
export function formatCompactNumber(value: number): string {
  if (value >= 1e9) {
    return `${(value / 1e9).toFixed(2)}B`;
  }
  if (value >= 1e6) {
    return `${(value / 1e6).toFixed(2)}M`;
  }
  if (value >= 1e3) {
    return `${(value / 1e3).toFixed(2)}K`;
  }
  return value.toFixed(2);
}

/**
 * Format a percentage value
 */
export function formatPercentage(value: number, decimals: number = 2): string {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(decimals)}%`;
}

/**
 * Format a wallet address to shortened form
 */
export function formatAddress(address: string, startChars: number = 6, endChars: number = 4): string {
  if (!address) return '';
  if (address.length < startChars + endChars) return address;
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
}

/**
 * Format a transaction hash to shortened form
 */
export function formatTxHash(hash: string): string {
  return formatAddress(hash, 8, 6);
}

/**
 * Format a token amount with proper decimals
 */
export function formatTokenAmount(amount: string | number, decimals: number = 18, displayDecimals: number = 4): string {
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(numAmount)) return '0';
  
  // For very small amounts, use scientific notation
  if (numAmount > 0 && numAmount < 0.0001) {
    return numAmount.toExponential(2);
  }
  
  return numAmount.toFixed(displayDecimals);
}

/**
 * Format a timestamp to readable date/time
 */
export function formatDate(timestamp: number, includeTime: boolean = true): string {
  const date = new Date(timestamp);
  
  if (includeTime) {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  }
  
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

/**
 * Format a relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(timestamp: number): string {
  const now = Date.now();
  const diff = now - timestamp;
  
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return `${seconds}s ago`;
}

/**
 * Format gas price in Gwei
 */
export function formatGasPrice(wei: bigint | string): string {
  const gwei = typeof wei === 'string' ? BigInt(wei) : wei;
  return `${(Number(gwei) / 1e9).toFixed(2)} Gwei`;
}

/**
 * Parse a string input to a safe number
 */
export function parseInputNumber(input: string): number {
  const cleaned = input.replace(/[^0-9.]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Validate if a string is a valid Ethereum address
 */
export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Format market cap with proper suffixes
 */
export function formatMarketCap(value: number): string {
  return `$${formatCompactNumber(value)}`;
}

/**
 * Format trading volume
 */
export function formatVolume(value: number): string {
  return formatCompactNumber(value);
}

/**
 * Calculate and format price change
 */
export function calculatePriceChange(currentPrice: number, previousPrice: number): {
  change: number;
  changePercent: number;
  formatted: string;
} {
  const change = currentPrice - previousPrice;
  const changePercent = (change / previousPrice) * 100;
  
  return {
    change,
    changePercent,
    formatted: formatPercentage(changePercent),
  };
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

/**
 * Format APY/APR percentage
 */
export function formatAPY(value: number): string {
  return `${value.toFixed(2)}%`;
}

/**
 * Convert wei to ether string
 */
export function weiToEther(wei: bigint, decimals: number = 4): string {
  return (Number(wei) / 1e18).toFixed(decimals);
}

/**
 * Convert ether to wei
 */
export function etherToWei(ether: string | number): bigint {
  const etherNum = typeof ether === 'string' ? parseFloat(ether) : ether;
  return BigInt(Math.floor(etherNum * 1e18));
}
