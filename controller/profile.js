import User from '../models/userModel.js';
import { hashPassword, comparePassword } from '../utils/passwordUtils.js';

// Thêm user mới
export const createUser = async (req, res) => {
    try {
        const { email, firstname, lastname, password } = req.body;
        
        // Kiểm tra xem email đã tồn tại chưa
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Email đã được sử dụng' });
        
        // Mã hóa mật khẩu
        const hashedPassword = await hashPassword(password);
        
        // Tạo user mới
        const newUser = new User({ email, firstname, lastname, password: hashedPassword });
        await newUser.save();
        
        res.status(201).json({ message: 'Tạo tài khoản thành công', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error });
    }
};

// Lấy danh sách tất cả user
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Không trả về mật khẩu
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error });
    }
};

// Lấy user theo ID
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({ message: 'Không tìm thấy user' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error });
    }
};

// Cập nhật user
export const updateUser = async (req, res) => {
    try {
        const { firstname, lastname, password } = req.body;
        
        let updateData = { firstname, lastname };
        
        // Nếu có password mới thì mã hóa lại
        if (password) {
            updateData.password = await hashPassword(password);
        }
        
        const updatedUser = await User.findByIdAndUpdate(req.params.id, updateData, { new: true }).select('-password');
        if (!updatedUser) return res.status(404).json({ message: 'Không tìm thấy user' });
        
        res.status(200).json({ message: 'Cập nhật thành công', user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error });
    }
};

// Xóa user
export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: 'Không tìm thấy user' });
        
        res.status(200).json({ message: 'Xóa user thành công' });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error });
    }
};