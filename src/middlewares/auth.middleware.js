// src/middlewares/auth.middleware.js
import jwt from 'jsonwebtoken';
import { env } from '../configs/env.js';

/**
 * Middleware kiểm tra token.
 * - Nếu có token hợp lệ: Gán user vào req.user
 * - Nếu không có token: req.user = null (Vẫn cho qua - chế độ Guest)
 * - Nếu token sai định dạng: Trả lỗi (hoặc coi như Guest tùy logic, ở đây ta coi như Guest)
 */
export const extractUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, env.jwtSecret);
      req.user = decoded; // { id: '...', role: 'user' }
    } catch (error) {
      console.log('Token invalid or expired, treating as Guest');
      req.user = null;
    }
  } else {
    req.user = null;
  }
  
  next();
};

/**
 * Middleware chặn nếu chưa đăng nhập (Dùng cho các route bắt buộc login như: Lưu bookmark)
 */
export const requireAuth = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: 'Vui lòng đăng nhập để thực hiện chức năng này' });
  }
  next();
};