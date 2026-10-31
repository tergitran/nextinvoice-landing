/**
 * Application URL Constants
 * Configured via NEXT_PUBLIC_APP_URL & NEXT_PUBLIC_API_URL environment variables
 * Automatically detects production environment to connect to live API
 */
export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ||
  (typeof window !== 'undefined' && window.location.hostname.endsWith('nextinvoice.pro.vn')
    ? 'https://app.nextinvoice.pro.vn'
    : process.env.NODE_ENV === 'production'
    ? 'https://app.nextinvoice.pro.vn'
    : 'http://localhost:3000');

export const LOGIN_URL = `${APP_URL}/login`;
export const REGISTER_URL = `${APP_URL}/register`;

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (typeof window !== 'undefined' && window.location.hostname.endsWith('nextinvoice.pro.vn')
    ? 'https://api.nextinvoice.pro.vn/api'
    : process.env.NODE_ENV === 'production'
    ? 'https://api.nextinvoice.pro.vn/api'
    : 'http://localhost:3001/api');
