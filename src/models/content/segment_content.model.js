const mongoose = require('mongoose');
const { Schema } = mongoose;

const segmentContentSchema = new Schema({
    segment: { type: Schema.Types.ObjectId, ref: 'Segment', required: true, index: true },
    author: { type: Schema.Types.ObjectId, ref: 'Author' }, // Bản dịch của ai?
    
    language: { type: String, required: true, enum: ['vi', 'zh', 'pli', 'en'] },
    
    // Nội dung HTML đã qua xử lý (chứa thẻ <gl>)
    // Vd: "Đời là <gl term='bể khổ'>bể khổ</gl>..."
    content: { type: String, required: true }, 
    
    // Text thô (Plain text) để phục vụ Search không bị dính thẻ HTML
    plain_text: { type: String, index: 'text' } 
});

module.exports = mongoose.model('SegmentContent', segmentContentSchema);