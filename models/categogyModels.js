import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // Tên danh mục
    },
    description: {
        type: String,
        required: false, // Mô tả danh mục (không bắt buộc)
    },
    icon: {  
        type: String,  
        required: false, // Icon của danh mục
    }
}, { timestamps: true });

export default mongoose.model('Category', CategorySchema);
