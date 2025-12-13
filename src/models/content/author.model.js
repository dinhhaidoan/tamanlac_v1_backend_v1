const mongoose = require('mongoose');
const { Schema } = mongoose;

const authorSchema = new Schema({
    name: { type: String, required: true }, // Vd: Thích Minh Châu
    slug: String,
    type: { type: String, enum: ['translator', 'author', 'commentator'], default: 'translator' },
    bio: String // Tiểu sử ngắn
});

module.exports = mongoose.model('Author', authorSchema);