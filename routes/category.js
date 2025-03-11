import express from 'express';
import { 
    getAllCategories, 
    getCategoryById, 
    addCategory, 
    updateCategory, 
    deleteCategory 
} from '../controllers/categoryController.js';

const router = express.Router();

// Lấy danh sách tất cả danh mục
router.get('/', getAllCategories);

// Lấy chi tiết danh mục theo ID
router.get('/:id', getCategoryById);

// Thêm danh mục mới
router.post('/', addCategory);

// Cập nhật danh mục theo ID
router.put('/:id', updateCategory);

// Xóa danh mục theo ID
router.delete('/:id', deleteCategory);

export default router;
