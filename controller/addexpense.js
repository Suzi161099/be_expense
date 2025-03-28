import ExpenseModel from "../models/addexpenseModels.js"; // Đảm bảo đúng tên file model

export const createExpense = async (req, res) => {
    try {
      const expense = new ExpenseModel(req.body);
      const savedExpense = await expense.save();
      res.status(201).json(savedExpense);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
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
export const getAllExpenses = async (req, res, next) => {
    try {
        const expenses = await ExpenseModel.find();
        res.status(200).json(expenses);
    } catch (err) {
        next(err);
    }
};
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
