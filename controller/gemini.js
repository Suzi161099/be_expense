import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import Category from '../models/categogyModels.js';
import moment from 'moment';

dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const processTextWithGemini = async (req, res) => {
    try {
        const { extractedText } = req.body;
        if (!extractedText) {
            return res.status(400).json({ status: 'error', message: 'Không có văn bản hóa đơn được cung cấp' });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-002" });

        const prompt = `
        Phân tích và trích xuất thông tin từ văn bản hóa đơn sau dưới dạng JSON:
        - Xác định danh mục chi tiêu phù hợp với danh sách dưới đây:
          1. Thực phẩm (Các mặt hàng liên quan đến thực phẩm)
          2. Điện tử (Thiết bị và dụng cụ điện tử)
          3. Dịch vụ (Các dịch vụ và tiện ích)
          4. Thời trang (Quần áo và phụ kiện thời trang) 
          5. Vận chuyển (Dịch vụ vận chuyển và logistics)
          6. Khác (Các mặt hàng khác)
        - Không giải thích
        - Cung cấp mô tả về nội dung chi tiêu của hóa đơn trong mục "description".
        - Xác định và phân loại chính xác loại tiền tệ 
        - Chuẩn hóa ngày sang định dạng ISO (YYYY-MM-DD).
        - Trả về JSON với định dạng sau:
        {
          "merchant": "Tên cửa hàng",
          "amount": "Tổng số tiền",
          "currency": "Loại tiền tệ",
         "date": "Ngày mua (ISO format)",
          "items": [
            { "name": "Tên sản phẩm", "quantity": "Số lượng", "price": "Giá" }
          ],
          "category": {
            "_id": "ID danh mục",
            "name": "Tên danh mục",
            "description": "Mô tả chi tiêu",
            "icon": "Biểu tượng danh mục (emoji hoặc URL)"
          }
        }

        Văn bản hóa đơn: "${extractedText}"
    `;
    const result = await model.generateContent([prompt]);
    const response = await result.response;
    let rawText = response.text().trim();
    rawText = rawText.replace(/```json|```/g, '').trim();
    
    let parsedData;
    try {
        parsedData = JSON.parse(rawText);
        console.log(parsedData);

    } catch (jsonError) {
        console.error("Lỗi JSON:", jsonError);
        return res.status(500).json({ status: 'error', message: 'Lỗi xử lý JSON từ AI' });
        
    }

    parsedData.date = moment(parsedData.date, moment.ISO_8601, true).isValid()
    ? moment(parsedData.date).format('YYYY-MM-DD')
    : moment().format('YYYY-MM-DD');

    if (!parsedData.currency || parsedData.currency === "Không xác định"||parsedData.currency === "VNĐ") {
        if (/\$\d+/.test(extractedText)) {
            parsedData.currency = "USD";
        } else if (/€\d+/.test(extractedText)) {
            parsedData.currency = "EUR";
        } else if (/¥\d+/.test(extractedText)) {
            parsedData.currency = "JPY";
        } else if (/฿\d+/.test(extractedText)) {
            parsedData.currency = "THB";
        } else if (/₫\d+/.test(extractedText)) {
            parsedData.currency = "VND";
        } else if (/SGD|S\$/.test(extractedText)) { 
            parsedData.currency = "SGD";
        }else if (/CNY|RMB|¥\d+/.test(extractedText)) {  
            parsedData.currency = "CNY";
        }else if (/៛\d+/.test(extractedText) || /KHR/.test(extractedText)) {  
            parsedData.currency = "KHR"; 
        }else if (/₭\d+/.test(extractedText) || /LAK/.test(extractedText)) {  
            parsedData.currency = "LAK"; 
        } 
         else {
            parsedData.currency = "VND"; 
        }
    }
    if (!parsedData.totalAmount && parsedData.items?.length > 0) {
        parsedData.totalAmount = parsedData.items.reduce((total, item) => {
            const quantity = parseFloat(item.quantity) || 1;
            const price = parseFloat(item.price) || 0;
            return total + quantity * price;
        }, 0).toFixed(2);
    }
    const matchedCategory = await Category.findOne({ name: parsedData.category.name });

    if (matchedCategory) {
        parsedData.category = {
            _id: matchedCategory._id,
            name: matchedCategory.name,
            description: matchedCategory.description,
            icon: matchedCategory.icon
        };
    } else {
        parsedData.category = {
            _id: "67e6985a484b2fe2c96bcce3",
            name: "Khác",
            description: "Các mặt hàng khác",
            icon: "category"
        };
    }
    const totalAmount = parsedData.totalAmount;
    const description = `Chi tiêu tổng cộng ${totalAmount} ${parsedData.currency} các mặt hàng trong danh mục ${parsedData.category.name}.`;
    parsedData.category.description = description;

    res.json({
        status: 'success',
        data: parsedData
    });
    }
    catch (error) {
        console.error("Lỗi hệ thống:", error);
        res.status(500).json({ status: 'error', message: error.message });
    }
};