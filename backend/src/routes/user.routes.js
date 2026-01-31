import express from 'express';
import {
  getAllBeneficiaries,
  approveBeneficiary,
  deactivateUser,
} from '../controllers/userController.js';

import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes in this file are officer-only
router.use(protect, authorize('OFFICER'));

// List all beneficiaries
router.get('/beneficiaries', getAllBeneficiaries);

// Approve a beneficiary (activates their account)
router.patch('/:userId/approve', approveBeneficiary);

// Deactivate any user (usually beneficiary)
router.patch('/:userId/deactivate', deactivateUser);

export default router;