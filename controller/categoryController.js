import Category from '../models/categogyModels.js';

// Lấy danh sách tất cả danh mục
export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find().sort({ createdAt: -1 });
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy danh sách danh mục", error });
    }
};

// Lấy chi tiết danh mục theo ID
export const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: "Không tìm thấy danh mục" });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy danh mục", error });
    }
};

// Thêm danh mục mới
export const addCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    const savedCategory = await category.save();
    res.status(200).json(savedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// Cập nhật danh mục
export const updateCategory = async (req, res) => {
    try {
        const { name, description, icon } = req.body;
        const category = await Category.findByIdAndUpdate(
            req.params.id, 
            { name, description, icon }, 
            { new: true }
        );

        if (!category) {
            return res.status(404).json({ message: "Không tìm thấy danh mục để cập nhật" });
        }

        res.status(200).json({ message: "Cập nhật danh mục thành công", category });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi cập nhật danh mục", error });
    }
};

// Xóa danh mục
export const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);

        if (!category) {
            return res.status(404).json({ message: "Không tìm thấy danh mục để xóa" });
        }

        res.status(200).json({ message: "Xóa danh mục thành công" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi xóa danh mục", error });
    }
};
