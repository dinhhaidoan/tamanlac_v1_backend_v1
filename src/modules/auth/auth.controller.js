import * as AuthService from './auth.service.js';
import { registerSchema, loginSchema } from './auth.validation.js';

export const register = async (req, res) => {
  const data = registerSchema.parse(req.body); // Validate bằng Zod
  const result = await AuthService.registerService(data);
  res.status(201).json({ success: true, data: result });
};

export const login = async (req, res) => {
  const data = loginSchema.parse(req.body);
  const result = await AuthService.loginService(data);
  res.status(200).json({ success: true, data: result });
};

export const googleLogin = async (req, res) => {
  const { token } = req.body;
  const result = await AuthService.googleLoginService(token);
  res.status(200).json({ success: true, data: result });
};