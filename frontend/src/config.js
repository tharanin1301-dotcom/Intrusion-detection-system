// Centralized API configuration for Aegis Network Security
// When deployed on Vercel, set VITE_API_BASE_URL in Vercel Environment Variables
// to your Railway backend URL (e.g. https://aegis-backend.up.railway.app)
export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000').replace(/\/$/, '');
