import mongoose from 'mongoose';
const { Schema } = mongoose;

const accountSchema = new Schema({
    email: { type: String, unique: true, sparse: true }, // Cho phép null nếu muốn tạo acc ẩn danh sau này
    password: { type: String }, // Hash
    google_id: { type: String, sparse: true },
    avatar: { type: String }, // Link ảnh đại diện Google
    full_name: { type: String }, // Tên hiển thị
    role: { type: String, default: 'user', enum: ['user', 'admin'] },
    created_at: { type: Date, default: Date.now }
});

export default mongoose.model('Account', accountSchema);