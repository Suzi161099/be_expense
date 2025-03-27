import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Tên đăng nhập là bắt buộc"],
            unique: true,
            trim: true,
            minlength: [3, "Tên đăng nhập ít nhất 3 ký tự"],
            maxlength: [20, "Tên đăng nhập tối đa 20 ký tự"],
        },
        email: {
            type: String,
            required: [true, "Email là bắt buộc"],
            unique: true,
            trim: true,
            lowercase: true,
            match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email không hợp lệ"],
        },
        password: {
            type: String,
            required: [true, "Mật khẩu là bắt buộc"],
            minlength: [6, "Mật khẩu ít nhất 6 ký tự"],
            select: false, // Không trả về password khi query
        },
    },
    { timestamps: true, versionKey: false }
);

export default mongoose.model("User", UserSchema);
