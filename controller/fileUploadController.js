// import Invoice from '../models/uploadfile';

// export const uploadInvoice = async (req, res, next) => {
//     try {
//         if (!req.file) {
//             return res.status(400).json({ message: 'Vui lòng tải lên một file PDF.' });
//         }

//         const newInvoice = new Invoice({
//             userId: req.user.id, 
//             filePath: req.file.path,
//             fileName: req.file.originalname,
//             uploadDate: new Date()
//         });

//         const savedInvoice = await newInvoice.save();
//         res.status(200).json(savedInvoice);
//     } catch (err) {
//         next(err);
//     }
// };


// controllers/expenseController.js
const Expense = require('../models/uploadfile');
const pdfParse = require('pdf-parse');
const xlsx = require('xlsx');
const fs = require('fs');

exports.uploadFile = async (req, res) => {
    const { path, mimetype } = req.file;
    try {
        if (mimetype === 'application/pdf') {
            const data = await processPdfFile(path);
            fs.unlinkSync(path);
            res.json({ success: true, data });
        } else if (mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            const data = processExcelFile(path);
            fs.unlinkSync(path);
            res.json({ success: true, data });
        } else {
            res.status(400).json({ success: false, message: 'Invalid file format' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error processing file' });
    }
};

exports.saveExpense = async (req, res) => {
    const { storeName, totalAmount, date, category } = req.body;
    try {
        const expense = new Expense({ storeName, totalAmount, date, category });
        await expense.save();
        res.json({ success: true, message: 'Expense saved successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error saving expense' });
    }
};

async function processPdfFile(filePath) {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    const text = data.text;
    return {
        storeName: extractStoreName(text),
        totalAmount: extractTotalAmount(text),
        date: extractDate(text)
    };
}

function processExcelFile(filePath) {
    const workbook = xlsx.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    return xlsx.utils.sheet_to_json(sheet);
}

function extractStoreName(text) {
    return text.split('\n')[0] || 'Unknown Store';
}

function extractTotalAmount(text) {
    const match = text.match(/\d+[,.]?\d*/);
    return match ? parseFloat(match[0].replace(',', '.')) : 0;
}

function extractDate(text) {
    const match = text.match(/\d{2}[\/.-]\d{2}[\/.-]\d{4}/);
    return match ? match[0] : 'Unknown Date';
}
