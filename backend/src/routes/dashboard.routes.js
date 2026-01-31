import express from 'express';
import {
  createAssetReview,
  getReviewsForAsset,
  getMyReviews,
} from '../controllers/reviewController.js';

import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

// Officer only
router.use(authorize('OFFICER'));

router.post('/assets/:assetId', createAssetReview);
router.get('/assets/:assetId', getReviewsForAsset);
router.get('/my', getMyReviews);

export default router;