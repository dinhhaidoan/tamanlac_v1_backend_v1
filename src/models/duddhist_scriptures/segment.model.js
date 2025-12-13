const mongoose = require('mongoose');
const { Schema } = mongoose;

const segmentSchema = new Schema({
    division: { type: Schema.Types.ObjectId, ref: 'Division', required: true, index: true },
    work: { type: Schema.Types.ObjectId, ref: 'Work', required: true }, // Link thẳng tới Work để query cho nhanh
    
    order: { type: Number, required: true }, // Thứ tự câu trong chương
    
    // Các topic liên quan (Vd: Khổ, Vô Ngã) - Để sau này làm Search theo chủ đề
    topics: [{ type: Schema.Types.ObjectId, ref: 'Topic' }] 
});

// Index kép: Giúp tìm nhanh "Câu số 5 của Chương 1"
segmentSchema.index({ division: 1, order: 1 });

module.exports = mongoose.model('Segment', segmentSchema);