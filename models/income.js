import mongoose from 'mongoose';

const IncomeSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true, // Số tiền thu nhập
    },
    source: {
        type: String,
        required: true, // Nguồn thu nhập (lương, đầu tư, quà tặng,...)
    },
    date: {
        type: Date,
        required: true, // Ngày nhập thu nhập
        default: Date.now,
    },
    description: {
        type: String,
        required: false, // Mô tả thu nhập (không bắt buộc)
    }
}, { timestamps: true });

export default mongoose.model('Income', IncomeSchema);
