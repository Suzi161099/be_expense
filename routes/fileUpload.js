// import express from 'express';
// import multer from 'multer';
// import { uploadInvoice } from '../controller/fileUploadController';

// const router = express.Router();

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// });

// const upload = multer({ 
//     storage,
//     fileFilter: (req, file, cb) => {
//         if (file.mimetype === "application/pdf") {
//             cb(null, true);
//         } else {
//             cb(new Error("Chỉ chấp nhận file PDF!"), false);
//         }
//     }
// });

// router.post('/upload', upload.single('file'), uploadInvoice);

// export default router;


// routes/expenseRoutes.js
const express = require('express');
const multer = require('multer');
const expenseController = require('../controller/fileUploadController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), expenseController.uploadFile);
router.post('/saveExpense', expenseController.saveExpense);

module.exports = router;