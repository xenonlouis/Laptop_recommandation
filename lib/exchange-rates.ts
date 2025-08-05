// Exchange rate utilities for EUR to MAD conversion

interface ExchangeRateResponse {
  success: boolean;
  rates: {
    MAD: number;
  };
  date: string;
}

const FALLBACK_RATE = 10.8; // Fallback rate if API fails
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

// Cache for exchange rate
let cachedRate: { rate: number; timestamp: number } | null = null;

/**
 * Fetch current EUR to MAD exchange rate  
 * Uses ExchangeRate-API.com (free tier: 1500 requests/month)
 * Supports 161 currencies including MAD
 */
export async function getEurToMadRate(): Promise<{ rate: number; isLive: boolean }> {
  // Check cache first
  if (cachedRate && (Date.now() - cachedRate.timestamp) < CACHE_DURATION) {
    return { rate: cachedRate.rate, isLive: true };
  }

  try {
    // Using ExchangeRate-API.com - free, supports MAD
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/EUR');
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.rates && data.rates.MAD) {
      const rate = data.rates.MAD;
      
      // Cache the result
      cachedRate = {
        rate: rate,
        timestamp: Date.now()
      };
      
      console.log(`💱 Live exchange rate updated: 1 EUR = ${rate.toFixed(2)} MAD (${data.date})`);
      return { rate: rate, isLive: true };
    } else {
      throw new Error('MAD currency not found in API response');
    }
  } catch (error) {
    console.warn('🔄 Exchange rate API failed, using fallback:', error);
    
    // Use fallback rate
    return { rate: FALLBACK_RATE, isLive: false };
  }
}

/**
 * Format currency with proper locale
 */
export function formatCurrency(amount: number, currency: 'EUR' | 'MAD'): string {
  if (currency === 'EUR') {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  } else {
    return `${amount.toLocaleString()} MAD`;
  }
}

/**
 * Convert MAD to EUR using current rate
 */
export function madToEur(madAmount: number, rate: number): number {
  return Math.round(madAmount / rate);
}

/**
 * Convert EUR to MAD using current rate
 */
export function eurToMad(eurAmount: number, rate: number): number {
  return Math.round(eurAmount * rate);
}