import app from './src/app.js';
import { connectDB } from './src/configs/db.js';
import { env } from './src/configs/env.js';

const startServer = async () => {
  await connectDB();

  app.listen(env.port, () => {
    console.log(`🚀 Server running on port ${env.port}`);
  });
};

startServer();