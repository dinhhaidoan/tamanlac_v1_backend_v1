// src/modules/auth/auth.service.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import Account from '../../models/user/account.model.js'; // Đảm bảo model này export default
import { env } from '../../configs/env.js';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role, email: user.email },
    env.jwtSecret,
    { expiresIn: env.jwtExpiresIn }
  );
};

export const registerService = async ({ email, password }) => {
  const existingUser = await Account.findOne({ email });
  if (existingUser) {
    throw { status: 400, message: 'Email đã được sử dụng' };
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await Account.create({
    email,
    password: hashedPassword,
    role: 'user',
  });

  const token = generateToken(newUser._id, newUser.role);
  return { user: { id: newUser._id, email: newUser.email }, token };
};

export const loginService = async ({ email, password }) => {
  const user = await Account.findOne({ email });
  if (!user) {
    throw { status: 401, message: 'Email hoặc mật khẩu không đúng' };
  }

  // Nếu user tạo bằng Google thì không có password -> Bắt buộc login bằng Google
  if (!user.password) {
     throw { status: 400, message: 'Tài khoản này đăng nhập bằng Google' };
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw { status: 401, message: 'Email hoặc mật khẩu không đúng' };
  }

  const token = generateToken(user._id, user.role);
  return { user: { id: user._id, email: user.email, role: user.role }, token };
};

// Logic Google Login (Placeholder - Cần Client ID từ FE gửi lên)
export const loginGoogle = async (token) => {
  // 1. Xác thực token với Google (Code cũ chưa có đoạn này)
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,  
  });
  const payload = ticket.getPayload();
  const { sub: googleId, email, name, picture } = payload;

  // 2. Tìm hoặc tạo user trong DB
  let user = await Account.findOne({ email });
  if (!user) {
    user = await Account.create({
      email,
      google_id: googleId,
      full_name: name,
      avatar: picture,
      role: 'user'
    });
  } else if (!user.google_id) {
    user.google_id = googleId;
    user.avatar = picture;
    await user.save();
  }

  return { token: generateToken(user), user };
};