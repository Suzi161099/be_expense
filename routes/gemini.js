import express from 'express';
import { processTextWithGemini } from '../controller/gemini.js';

const router = express.Router();

router.post('/process', processTextWithGemini);
export default router;