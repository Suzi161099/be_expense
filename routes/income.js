import express from 'express';
import { 
    getAllIncomes,
    getIncomeById, 
    addIncome, 
    updateIncome 
} from '../controller/income.js';

const router = express.Router();

// Lấy danh sách tất cả các khoản thu nhập
router.get('/', getAllIncomes);

// Lấy thông tin chi tiết của một khoản thu nhập theo ID
router.get('/:id', getIncomeById);

// Thêm một khoản thu nhập mới
router.post('/', addIncome);

// Cập nhật một khoản thu nhập theo ID
router.put('/:id', updateIncome);

export default router;
