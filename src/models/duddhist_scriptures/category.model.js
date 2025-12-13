const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
    name: { type: String, required: true }, // Vd: "Kinh Tạng"
    slug: { type: String, unique: true, index: true }, // Vd: "kinh-tang"
    parent: { type: Schema.Types.ObjectId, ref: 'Category', default: null }, // Đệ quy danh mục cha con
    order: { type: Number, default: 0 }
});

module.exports = mongoose.model('Category', categorySchema);