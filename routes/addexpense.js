// import express from 'express';
// import { 
//     createExpense, 
//     getExpenseById, 
//     getAllExpenses, 
//     updateExpense
// } from '../controller/addexpense.js';

// const expense = express.Router();

// expense.post('/', createExpense);  // Thêm chi tiêu mới
// expense.get('/:id', getExpenseById);  // Lấy một chi tiêu theo ID
// expense.get('/', getAllExpenses);  // Lấy tất cả chi tiêu
// expense.put('/:id', updateExpense); // Cập nhật chi tiêu

// export default expense;

import express from 'express';
import { 
    createExpense, 
    getExpenseById, 
    getAllExpenses, 
    updateExpense
} from '../controller/addexpense.js'; 

const router = express.Router();

router.post('/expenses', createExpense);  // Tạo khoản chi tiêu mới
router.get('/expenses/:id', getExpenseById);  // Lấy một khoản chi tiêu theo ID
router.get('/expenses', getAllExpenses);  // Lấy danh sách khoản chi tiêu
router.put('/expenses/:id', updateExpense); // Cập nhật khoản chi tiêu

export default router;
