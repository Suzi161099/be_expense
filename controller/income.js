import Income from '../models/income.js';

// Lấy danh sách tất cả các khoản thu nhập
export const getAllIncomes = async (req, res) => {
    try {
        const incomes = await Income.find().sort({ date: -1 });
        res.status(200).json(incomes);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy danh sách thu nhập", error });
    }
};

// Lấy thông tin chi tiết một khoản thu nhập theo ID
export const getIncomeById = async (req, res) => {
    try {
        const income = await Income.findById(req.params.id);
        if (!income) {
            return res.status(404).json({ message: "Không tìm thấy thu nhập" });
        }
        res.status(200).json(income);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy thu nhập", error });
    }
};

// Thêm một khoản thu nhập mới
export const addIncome = async (req, res) => {
    try {
        const { amount, source, date, description } = req.body;

        if (!amount || !source || !date) {
            return res.status(400).json({ message: "Vui lòng điền đầy đủ thông tin" });
        }

        const newIncome = new Income({ amount, source, date, description });
        await newIncome.save();
        
        res.status(201).json({ message: "Thêm thu nhập thành công", income: newIncome });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi thêm thu nhập", error });
    }
};

// Cập nhật thông tin một khoản thu nhập
export const updateIncome = async (req, res) => {
    try {
        const { amount, source, date, description } = req.body;
        const income = await Income.findByIdAndUpdate(req.params.id, 
            { amount, source, date, description }, 
            { new: true }
        );

        if (!income) {
            return res.status(404).json({ message: "Không tìm thấy thu nhập để cập nhật" });
        }

        res.status(200).json({ message: "Cập nhật thu nhập thành công", income });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi cập nhật thu nhập", error });
    }
};

// Lấy tổng thu nhập trong tháng
export const getTotalIncomeByMonth = async (req, res) => {
    try {
        const { year, month } = req.params;

        // Chuyển đổi tháng và năm về dạng số nguyên
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0, 23, 59, 59);

        const totalIncome = await Income.aggregate([
            {
                $match: {
                    date: { $gte: startDate, $lte: endDate }
                }
            },
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: "$amount" }
                }
            }
        ]);

        res.status(200).json({ 
            month, 
            year, 
            totalIncome: totalIncome.length > 0 ? totalIncome[0].totalAmount : 0 
        });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy tổng thu nhập trong tháng", error });
    }
};

