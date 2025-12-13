const mongoose = require('mongoose');
const { Schema } = mongoose;

const contemplationSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    segment: { type: Schema.Types.ObjectId, ref: 'Segment' }, // Gắn vào câu nào
    content: { type: String, required: true }, // Nhật ký
    is_private: { type: Boolean, default: true } // Luôn ẩn
}, { timestamps: true });

module.exports = mongoose.model('Contemplation', contemplationSchema);