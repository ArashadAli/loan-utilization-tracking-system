// routes/index.js
import express from 'express';

import authRouter    from './auth.routes.js';
import userRouter    from './user.routes.js';
import loanRouter    from './loan.routes.js';
import assetRouter   from './asset.routes.js';
import reviewRouter  from './review.routes.js';
import dashboardRouter from './dashboard.routes.js';

const router = express.Router();

// Version prefix (optional but recommended)
router.use('/auth',       authRouter);
router.use('/users',      userRouter);
router.use('/loans',      loanRouter);
router.use('/assets',     assetRouter);
router.use('/reviews',    reviewRouter);
router.use('/dashboard',  dashboardRouter);

export default router;