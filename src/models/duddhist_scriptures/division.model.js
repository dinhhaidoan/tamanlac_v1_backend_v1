const mongoose = require('mongoose');
const { Schema } = mongoose;

const divisionSchema = new Schema({
    work: { type: Schema.Types.ObjectId, ref: 'Work', required: true, index: true },
    title: { type: String, required: true },
    order: { type: Number, required: true } // Thứ tự chương 1, 2, 3
});

module.exports = mongoose.model('Division', divisionSchema);