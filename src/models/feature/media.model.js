const mongoose = require('mongoose');
const { Schema } = mongoose;

const mediaSchema = new Schema({
    // Audio này thuộc bộ kinh nào?
    work: { type: Schema.Types.ObjectId, ref: 'Work', required: true },
    
    // (Tuỳ chọn) Thuộc cụ thể phẩm nào? Nếu null thì là audio của cả bộ
    division: { type: Schema.Types.ObjectId, ref: 'Division' },

    title: { type: String, required: true }, // Vd: "Phẩm 1 - Giọng đọc thầy Thích..."
    type: { type: String, enum: ['audio', 'video'], default: 'audio' },
    
    // Link file (Cloudinary, S3 hoặc YouTube ID)
    url: { type: String, required: true }, 
    
    // Người đọc/Giảng sư
    artist: { type: String }, 
    
    // Thời lượng (giây) - Để hiển thị "15 phút"
    duration: { type: Number, default: 0 },
    
    // File size (bytes) - Để user biết nặng nhẹ trước khi tải offline
    size: { type: Number }
}, { 
    timestamps: true 
});

module.exports = mongoose.model('Media', mediaSchema);