import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';

import { errorHandler } from './middlewares/error.middleware.js';

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

/* ====== HEALTH CHECK ====== */
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Backend Phật Pháp đang hoạt động',
  });
});

/* ====== ROUTES (sẽ thêm sau) ====== */
// app.use('/api/auth', authRoutes);
// app.use('/api/sutras', sutraRoutes);

/* ====== ERROR HANDLER ====== */
app.use(errorHandler);

export default app;