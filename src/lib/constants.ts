/**
 * Application URL Constants
 * Configured via NEXT_PUBLIC_APP_URL environment variable (e.g. on Vercel)
 * Defaults to http://localhost:3000 for local development
 */
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
export const LOGIN_URL = `${APP_URL}/login`;
export const REGISTER_URL = `${APP_URL}/register`;
