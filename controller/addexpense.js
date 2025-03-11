// import ExpenseModel from "../models/addexpenseModels.js";

// // Tạo một khoản chi tiêu mới
// export const createExpense = async (req, res, next) => {
//     try {
//         const newExpense = new ExpenseModel(req.body);
//         const savedExpense = await newExpense.save();
//         res.status(201).json(savedExpense);
//     } catch (err) {
//         next(err);
//     }
// };

// // Cập nhật khoản chi tiêu
// export const updateExpense = async (req, res, next) => {
//     try {
//         const updatedExpense = await ExpenseModel.findByIdAndUpdate(
//             req.params.id,
//             { $set: req.body },
//             { new: true }
//         );
//         res.status(200).json(updatedExpense);
//     } catch (err) {
//         next(err);
//     }
// };

// // Xem danh sách tất cả khoản chi tiêu
// export const getAllExpenses = async (req, res, next) => {
//     try {
//         const expenses = await ExpenseModel.find();
//         res.status(200).json(expenses);
//     } catch (err) {
//         next(err);
//     }
// };

// // Xem một khoản chi tiêu cụ thể
// export const getExpenseById = async (req, res, next) => {
//     try {
//         const expense = await ExpenseModel.findById(req.params.id);
//         if (!expense) return res.status(404).json({ message: "Expense not found" });
//         res.status(200).json(expense);
//     } catch (err) {
//         next(err);
//     }
// };

import ExpenseModel from "../models/addexpenseModels.js"; // Đảm bảo đúng tên file model

// 🟢 Tạo một khoản chi tiêu mới
export const createExpense = async (req, res, next) => {
    try {
        const { merchant, amount, category, date, description } = req.body;

        // Kiểm tra dữ liệu đầu vào
        if (!merchant || !amount || !category || !date) {
            return res.status(400).json({ message: "Thiếu thông tin bắt buộc!" });
        }

        const newExpense = new ExpenseModel({
            merchant,
            amount,
            category,
            date,
            description
        });

        const savedExpense = await newExpense.save();
        console.log(savedExpense)
        res.status(201).json(savedExpense);
    } catch (err) {
        next(err);
    }
};

// 🟢 Cập nhật khoản chi tiêu
export const updateExpense = async (req, res, next) => {
    try {
        const { merchant, amount, category, date, description } = req.body;

        const updatedExpense = await ExpenseModel.findByIdAndUpdate(
            req.params.id,
            { merchant, amount, category, date, description },
            { new: true, runValidators: true }
        );

        if (!updatedExpense) {
            return res.status(404).json({ message: "Không tìm thấy khoản chi tiêu" });
        }

        res.status(200).json(updatedExpense);
    } catch (err) {
        next(err);
    }
};

// 🟢 Xem danh sách tất cả khoản chi tiêu
export const getAllExpenses = async (req, res, next) => {
    try {
        const expenses = await ExpenseModel.find();
        res.status(200).json(expenses);
    } catch (err) {
        next(err);
    }
};

// 🟢 Xem một khoản chi tiêu cụ thể
export const getExpenseById = async (req, res, next) => {
    try {
        const expense = await ExpenseModel.findById(req.params.id);
        if (!expense) {
            return res.status(404).json({ message: "Không tìm thấy khoản chi tiêu" });
        }
        res.status(200).json(expense);
    } catch (err) {
        next(err);
    }
};
