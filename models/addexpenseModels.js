import mongoose from 'mongoose';

const ExpenseSchema = new mongoose.Schema({
    merchant: {
        type: String,
        required: false, // Tên cửa hàng hoặc nơi chi tiêu
    },
    amount: {
        type: Number,
        required: false, // Số tiền chi tiêu
        min: 0,  // Không cho phép giá trị âm
    },
    category: {
        type: String,
        required: false, // Danh mục chi tiêu
    },
    date: {
        type: Date,
        required: false, // Ngày nhập chi tiêu
        default: () => Date.now(), // Đảm bảo Date.now() trả về đúng giá trị thời gian hiện tại
    },
    description: {
        type: String,
        required: false, // Mô tả chi tiêu (không bắt buộc)
    },
}, { timestamps: true });

export default mongoose.model('Expense', ExpenseSchema);
