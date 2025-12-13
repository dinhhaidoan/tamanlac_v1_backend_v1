    const mongoose = require('mongoose');
const { Schema } = mongoose;

const accountSchema = new Schema({
    email: { type: String, unique: true, sparse: true }, // Cho phép null nếu muốn tạo acc ẩn danh sau này
    password: { type: String }, // Hash
    role: { type: String, default: 'user', enum: ['user', 'admin'] },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Account', accountSchema);