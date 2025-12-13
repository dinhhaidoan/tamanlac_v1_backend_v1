const mongoose = require('mongoose');
const { Schema } = mongoose;

const historySchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'Account', required: true },
    work: { type: Schema.Types.ObjectId, ref: 'Work', required: true },
    
    // Link tới segment để khi bấm vào là cuộn tới đúng chỗ
    last_segment: { type: Schema.Types.ObjectId, ref: 'Segment' },
    
    updated_at: { type: Date, default: Date.now }
});

// Mỗi user chỉ có 1 record history cho 1 bộ kinh
historySchema.index({ user: 1, work: 1 }, { unique: true });

module.exports = mongoose.model('History', historySchema);