import express from 'express';
import {
  createLoanRequest,
  getMyLoans,
  getLoansPendingReview,
  updateLoanStatus,
} from '../controllers/loanController.js';

import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

// Beneficiary routes
router.post('/', authorize('BENEFICIARY'), createLoanRequest);
router.get('/my', authorize('BENEFICIARY'), getMyLoans);

// Officer routes
router.get('/pending', authorize('OFFICER'), getLoansPendingReview);
router.patch('/:loanId/status', authorize('OFFICER'), updateLoanStatus);

export default router;