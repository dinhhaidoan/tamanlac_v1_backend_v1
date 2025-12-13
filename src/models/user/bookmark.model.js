const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookmarkSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'Account', required: true, index: true },
    
    // Quan trọng: Link chính xác vào Segment (câu)
    segment: { type: Schema.Types.ObjectId, ref: 'Segment', required: true },
    
    // Snapshot dữ liệu (Lưu thừa 1 chút để hiển thị danh sách Bookmark nhanh hơn)
    // Giúp không cần join bảng Segment/Work khi chỉ cần hiện list
    work_title: String,     // Vd: "Kinh Pháp Cú"
    division_title: String, // Vd: "Phẩm Song Yếu"
    preview_text: String,   // Vd: "Ý dẫn đầu các pháp..." (Cắt 50 ký tự đầu)
    
    // Ghi chú cá nhân của user cho bookmark này
    note: { type: String, maxlength: 1000 } 
}, { 
    timestamps: true 
});

// Index để load nhanh danh sách bookmark của 1 user, sắp xếp theo ngày tạo
bookmarkSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('Bookmark', bookmarkSchema);