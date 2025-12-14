// src/modules/auth/auth.validation.js
import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu phải từ 6 ký tự trở lên'),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});