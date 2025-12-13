const mongoose = require('mongoose');
const { Schema } = mongoose;

const practiceSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'Account', required: true, index: true },
    
    // Loại hình thực hành
    activity_type: { 
        type: String, 
        required: true, 
        enum: ['meditation', 'chanting', 'sutra_copying', 'reading_sutra'] 
    },
    
    // Dữ liệu định lượng
    duration_seconds: { type: Number, default: 0 }, // Vd: Thiền 1800s (30p)
    count: { type: Number, default: 0 }, // Vd: Tụng 3 biến, Lạy 108 lạy
    
    // Nếu là tụng kinh/chép kinh thì kinh nào? (Optional)
    target_work: { type: Schema.Types.ObjectId, ref: 'Work' },

    // Ngày thực hành (Lưu Date object set về 00:00:00 giờ local)
    // Để dễ dàng Group By ngày khi vẽ biểu đồ thống kê
    date: { type: Date, required: true, index: true },
    
    // Cảm nhận sau buổi tập (ngắn gọn)
    note: String
}, { 
    timestamps: true 
});

module.exports = mongoose.model('Practice', practiceSchema);