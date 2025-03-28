// import express from 'express';
// import dotenv from 'dotenv';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import cookieParser from 'cookie-parser';
// //--------------------------------------------------------------------
// const app=express();
// dotenv.config();
// app.use(cors());
// app.use(cookieParser());
// app.use(express.json());

// //--------------------------------------------------------------------
// app.use((err,req,res,next)=>{
//     const errorStatus = err.status||500;
//     const errorMessage = err.message|| 'Đã xảy ra lỗi!!';
//     return res.status(errorStatus).json({
//         success: false,
//         status:errorStatus,
//         message:errorMessage,
//         stack:err.stack,
//     })
// });
// const connectMongoDB= async ()=>{
//     try{
//         await mongoose.connect(process.env.DB);
//         console.log('Kết nối với dữ liệu !!');
//     }
//     catch(err){
//         console.log("Lỗi kết nối với dữ liệu");
//         throw err;
//     }
// }
// mongoose.connection.on('error',(err)=>{
//     console.log(`Lỗi kết nối cơ sở dữ liệu: ${err.message}`);
// });

// const PORT =process.env.PORT||3000;
// app.listen(PORT,()=>{
//     connectMongoDB();
//     console.log(`Server đang chạy tại http://localhost:${PORT}`);
// })

// bảng 2 
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import geminiRoutes from './routes/gemini.js';
import expenseRoutes from "./routes/addexpense.js";
import incomeRoutes from "./routes/income.js";
import authRoutes from "./routes/auth.js";
import multer from "multer";
// import uploadFile from "./routes/fileUpload";
import categoryRoutes from './routes/category.js';
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());

const upload = multer({ dest: "uploads/" });

// Kết nối MongoDB
const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ Kết nối MongoDB thành công!");
    } catch (err) {
        console.error("❌ Lỗi kết nối MongoDB:", err.message);
        process.exit(1);
    }
};

// Sử dụng route
app.use("/api/expense", expenseRoutes);
app.use("/api/income", incomeRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/gemini', geminiRoutes);
app.use('/api/categories', categoryRoutes);
// app.use("/api/upload", upload.single("file"), uploadFile);

// Middleware xử lý lỗi
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Đã xảy ra lỗi!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: process.env.NODE_ENV === "development" ? err.stack : {},
    });
});

// Chạy server sau khi kết nối MongoDB thành công
const PORT = process.env.PORT || 3000;
connectMongoDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
    });
});




// import express from "express";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import multer from "multer";
// import path from "path";

// import expenseRoutes from "./routes/addexpense.js";
// import incomeRoutes from "./routes/income.js";
// import authRoutes from "./routes/auth.js";

// dotenv.config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(cookieParser());
// app.use(express.json());
// app.use("/uploads", express.static(path.join("uploads"))); // Serve static files

// // Cấu hình Multer để lưu file hình ảnh
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "uploads/");
//     },
//     filename: (req, file, cb) => {
//         cb(null, `${Date.now()}_${file.originalname}`);
//     },
// });
// const upload = multer({ storage });

// // API upload hình ảnh
// app.post("/api/upload", upload.single("file"), (req, res) => {
//     if (!req.file) {
//         return res.status(400).json({ success: false, message: "Không có file nào được tải lên!" });
//     }
//     res.status(200).json({
//         success: true,
//         message: "Tải lên thành công!",
//         fileUrl: `/uploads/${req.file.filename}`,
//     });
// });

// // Kết nối MongoDB
// const connectMongoDB = async () => {
//     try {
//         await mongoose.connect(process.env.DB, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log("✅ Kết nối MongoDB thành công!");
//     } catch (err) {
//         console.error("❌ Lỗi kết nối MongoDB:", err.message);
//         process.exit(1);
//     }
// };

// // Sử dụng route
// app.use("/api/expense", expenseRoutes);
// app.use("/api/income", incomeRoutes);
// app.use("/api/auth", authRoutes);

// // Middleware xử lý lỗi
// app.use((err, req, res, next) => {
//     const errorStatus = err.status || 500;
//     const errorMessage = err.message || "Đã xảy ra lỗi!";
//     return res.status(errorStatus).json({
//         success: false,
//         status: errorStatus,
//         message: errorMessage,
//         stack: process.env.NODE_ENV === "development" ? err.stack : {}, // Ẩn stack nếu không ở môi trường dev
//     });
// });

// // Chạy server sau khi kết nối MongoDB thành công
// const PORT = process.env.PORT || 3000;
// connectMongoDB().then(() => {
//     app.listen(PORT, () => {
//         console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
//     });
// });

