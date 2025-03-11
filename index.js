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

import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import expenseRoutes from "./routes/addexpense.js";
import incomeRoutes from "./routes/income.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());

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
        process.exit(1); // Thoát chương trình nếu không kết nối được
    }
};

// Sử dụng route đúng cách
app.use("/api", expenseRoutes);
app.use("/api/income", incomeRoutes); // Bỏ dấu phẩy thừa

// Middleware xử lý lỗi
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Đã xảy ra lỗi!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: process.env.NODE_ENV === "development" ? err.stack : {}, // Ẩn stack trace nếu không phải môi trường dev
    });
});

// Chạy server sau khi kết nối MongoDB thành công
const PORT = process.env.PORT || 3000;
connectMongoDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
    });
});
