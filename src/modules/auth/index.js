// src/modules/auth/index.js
import authRoutes from './auth.route.js';

export const authModule = {
  routes: authRoutes,
  prefix: '/auth' // Prefix cho API: /api/auth/...
};