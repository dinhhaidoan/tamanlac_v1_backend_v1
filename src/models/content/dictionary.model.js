const mongoose = require('mongoose');
const { Schema } = mongoose;

const dictionarySchema = new Schema({
    term: { type: String, required: true, unique: true, index: true, lowercase: true }, // "ngũ uẩn"
    short_def: { type: String, required: true }, // "Năm yếu tố cấu thành..." (Hiện popup)
    long_def: String, // Giải thích sâu (Xem thêm)
    source: String // "Từ điển Đạo Uyển"
});

module.exports = mongoose.model('Dictionary', dictionarySchema);