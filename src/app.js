import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';

import { errorHandler } from './middlewares/error.middleware.js';
import { extractUser } from './middlewares/auth.middleware.js'; // Import middleware
import { authModule } from './modules/auth/index.js'; // Import module Auth

const app = express();

/* ====== GLOBAL MIDDLEWARE ====== */
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
// Global Auth Middleware: Luôn chạy để check xem user là ai (hoặc là khách)
app.use(extractUser);

/* ====== ROUTES ====== */
// Mount module Auth vào đường dẫn /api/auth
app.use(`/api${authModule.prefix}`, authModule.routes);

/* ====== HEALTH CHECK ====== */
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Backend Phật Pháp đang hoạt động',
    currentUser: req.user || 'Guest' // Test thử xem middleware hoạt động chưa
  });
});


/* ====== ERROR HANDLER ====== */
app.use(errorHandler);

export default app;