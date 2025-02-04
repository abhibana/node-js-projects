import express from 'express';
import { handleGenerateNewShortURL, handleShortURLRedirection, handleGetAnalytics } from '../controllers/url.js';

export const router = express.Router();

router.post('/', handleGenerateNewShortURL);

router.get('/:shortId', handleShortURLRedirection);

router.get('/analytics/:shortId', handleGetAnalytics);