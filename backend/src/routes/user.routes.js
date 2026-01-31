import express from 'express';
import {
  getAllBeneficiaries,
  activateBeneficiary,
  deactivateUser,
} from '../controllers/userController.js';

import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes below are officer-only
router.use(protect, authorize('OFFICER'));

router.get('/beneficiaries',          getAllBeneficiaries);
router.patch('/beneficiaries/:userId/activate',  activateBeneficiary);
router.patch('/users/:userId/deactivate',        deactivateUser);

export default router;