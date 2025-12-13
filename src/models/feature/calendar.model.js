const mongoose = require('mongoose');
const { Schema } = mongoose;

const calendarSchema = new Schema({
    // Lưu dạng chuỗi ngày âm: "DD/MM" (Vd: "15/04")
    lunar_date: { type: String, required: true, index: true }, 
    
    title: { type: String, required: true }, // Vd: "Lễ Phật Đản"
    description: String, // "Kỷ niệm ngày Đức Phật đản sinh..."
    
    // Loại ngày: Trai giới (ăn chay), Lễ lớn, Vía chư Thiên...
    type: { 
        type: String, 
        enum: ['holiday', 'fasting', 'memorial'], 
        default: 'holiday' 
    },
    
    // Cờ báo hiệu quan trọng (để hiện đỏ trên lịch)
    is_major: { type: Boolean, default: false }
});

module.exports = mongoose.model('Calendar', calendarSchema);