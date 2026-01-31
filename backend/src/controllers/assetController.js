import AssetUpload from '../models/AssetUpload.js';
import Loan from '../models/Loan.js';

export const uploadAssetProof = async (req, res) => {
  try {
    if (req.user.role !== 'BENEFICIARY') {
      return res.status(403).json({ error: 'Only beneficiaries can upload proofs' });
    }

    const { loanId } = req.params;
    const { latitude, longitude, accuracy } = req.body;

    if (!req.file?.path) {
      return res.status(400).json({ error: 'No image uploaded' });
    }

    if (!latitude || !longitude) {
      return res.status(400).json({ error: 'Geo-location is required' });
    }

    const loan = await Loan.findById(loanId);
    if (!loan) return res.status(404).json({ error: 'Loan not found' });

    if (loan.beneficiary.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'This loan does not belong to you' });
    }

    if (!['ACTIVE'].includes(loan.status)) {
      return res.status(400).json({ error: 'Can only upload proofs for ACTIVE loans' });
    }

    const asset = await AssetUpload.create({
      loan: loanId,
      beneficiary: req.user._id,
      imageUrl: req.file.path, // or req.file.location if using cloud storage
      geoLocation: {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        accuracy: accuracy ? parseFloat(accuracy) : undefined,
        capturedAt: new Date(),
      },
    });

    res.status(201).json({
      success: true,
      data: asset,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error', message: err.message });
  }
};

export const getMyAssetUploads = async (req, res) => {
  try {
    if (req.user.role !== 'BENEFICIARY') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const assets = await AssetUpload.find({ beneficiary: req.user._id })
      .populate('loan', 'loanNumber purpose amount status')
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      success: true,
      count: assets.length,
      data: assets,
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getAssetsForLoan = async (req, res) => {
  try {
    const { loanId } = req.params;

    // Officers can see all, beneficiaries only their own
    let filter = { loan: loanId };
    if (req.user.role === 'BENEFICIARY') {
      filter.beneficiary = req.user._id;
    }

    const assets = await AssetUpload.find(filter)
      .populate('beneficiary', 'name mobileNumber')
      .populate({
        path: 'loan',
        select: 'loanNumber amount purpose status',
      })
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      success: true,
      count: assets.length,
      data: assets,
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};