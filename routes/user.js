import express from 'express';
import { 
    createUser, 
    getAllUsers, 
    getUserById, 
    updateUser, 
    deleteUser 
} from '../controllers/userController.js';

const router = express.Router();

router.post('/', createUser); // Thêm user mới
router.get('/', getAllUsers); // Lấy danh sách user
router.get('/:id', getUserById); // Lấy user theo ID
router.put('/:id', updateUser); // Cập nhật user
router.delete('/:id', deleteUser); // Xóa user

export default router;