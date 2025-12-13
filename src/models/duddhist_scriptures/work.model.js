const mongoose = require('mongoose');
const { Schema } = mongoose;

const workSchema = new Schema({
    title: { type: String, required: true, index: true }, // Tên kinh
    slug: { type: String, unique: true }, 
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }], // Thuộc danh mục nào
    authors: [{ type: Schema.Types.ObjectId, ref: 'Author' }], // Tác giả/Dịch giả chính
    
    // Metadata
    total_segments: { type: Number, default: 0 }, // Tổng số câu (để tính %)
    description: String,
    cover_image: String, // Link ảnh bìa (nếu có)
}, { timestamps: true });

module.exports = mongoose.model('Work', workSchema);