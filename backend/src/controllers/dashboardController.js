import Loan from '../models/Loan.js';
import User from '../models/User.js';
import AssetUpload from '../models/AssetUpload.js';
import Review from '../models/review.js';

export const getOfficerDashboard = async (req, res) => {
  try {
    if (req.user.role !== 'OFFICER') {
      return res.status(403).json({ error: 'Officer access only' });
    }

    const [
      totalLoans,
      pendingLoans,
      activeLoans,
      pendingBeneficiaries,
      totalAssetUploads,
      approvedUploads,
      rejectedUploads,
    ] = await Promise.all([
      Loan.countDocuments(),
      Loan.countDocuments({ status: 'PENDING' }),
      Loan.countDocuments({ status: 'ACTIVE' }),
      User.countDocuments({ role: 'BENEFICIARY', isActive: false }),
      AssetUpload.countDocuments(),
      AssetUpload.countDocuments({ status: 'APPROVED' }),
      AssetUpload.countDocuments({ status: 'REJECTED' }),
    ]);

    res.json({
      success: true,
      data: {
        totalLoans,
        pendingLoans,
        activeLoans,
        pendingBeneficiaries,
        assetUploads: {
          total: totalAssetUploads,
          approved: approvedUploads,
          rejected: rejectedUploads,
        },
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getBeneficiaryDashboard = async (req, res) => {
  try {
    if (req.user.role !== 'BENEFICIARY') {
      return res.status(403).json({ error: 'Beneficiary access only' });
    }

    const [
      myLoansCount,
      myActiveLoans,
      myPendingLoans,
      myAssetUploads,
      myApprovedUploads,
    ] = await Promise.all([
      Loan.countDocuments({ beneficiary: req.user.id }),
      Loan.countDocuments({ beneficiary: req.user.id, status: 'ACTIVE' }),
      Loan.countDocuments({ beneficiary: req.user.id, status: 'PENDING' }),
      AssetUpload.countDocuments({ beneficiary: req.user.id }),
      AssetUpload.countDocuments({ beneficiary: req.user.id, status: 'APPROVED' }),
    ]);

    res.json({
      success: true,
      data: {
        loans: {
          total: myLoansCount,
          active: myActiveLoans,
          pending: myPendingLoans,
        },
        assetUploads: {
          total: myAssetUploads,
          approved: myApprovedUploads,
        },
      },
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};