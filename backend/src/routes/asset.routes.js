import express from 'express';
import {
  uploadAssetProof,
  getMyAssetUploads,
  getAssetsForLoan,
} from '../controllers/assetController.js';

import { protect, authorize } from '../middleware/authMiddleware.js';
import upload from '../middleware/multerConfig.js';  // your multer setup

const router = express.Router();

router.use(protect);

// Beneficiary uploads proof (with image)
router.post(
  '/loans/:loanId',
  authorize('BENEFICIARY'),
  upload.single('image'),           // field name = "image"
  uploadAssetProof
);

// Beneficiary sees own uploads
router.get('/my', authorize('BENEFICIARY'), getMyAssetUploads);

// Both roles can see uploads of a specific loan (filtered by ownership)
router.get('/loans/:loanId', getAssetsForLoan);

export default router;