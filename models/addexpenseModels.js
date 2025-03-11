import mongoose from 'mongoose';

const ExpenseSchema = new mongoose.Schema({
    merchant: {
        type: String,
        required: true, // Tên cửa hàng hoặc nơi chi tiêu
    },
    amount: {
        type: Number,
        required: true, // Số tiền chi tiêu
    },
    category: {
        type: String,
        required: true, // Danh mục chi tiêu
    },
    date: {
        type: Date,
        required: true, // Ngày nhập chi tiêu
        default: Date.now,
    },
    description: {
        type: String,
        required: false, // Mô tả chi tiêu (không bắt buộc)
    }
}, { timestamps: true });

export default mongoose.model('Expense', ExpenseSchema);
