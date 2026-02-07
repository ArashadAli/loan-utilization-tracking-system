import Review from '../models/review.js';
import AssetUpload from '../models/AssetUpload.js';

export const createAssetReview = async (req, res) => {
  try {
    if (req.user.role !== 'OFFICER') {
      return res.status(403).json({ error: 'Only officers can review uploads' });
    }

    const { assetId } = req.params;
    const { decision, remarks } = req.body;

    if (!['APPROVED', 'REJECTED'].includes(decision)) {
      return res.status(400).json({ error: 'Decision must be APPROVED or REJECTED' });
    }

    const asset = await AssetUpload.findById(assetId);
    if (!asset) return res.status(404).json({ error: 'Asset upload not found' });

    // Optional: prevent multiple reviews of same asset
    const existingReview = await Review.findOne({ assetUpload: assetId });
    if (existingReview) {
      return res.status(400).json({ error: 'This asset has already been reviewed' });
    }

    const review = await Review.create({
      assetUpload: assetId,
      officer: req.user._id,
      decision,
      remarks: remarks?.trim() || undefined,
    });

    // Update asset status
    asset.status = decision;
    await asset.save();

    res.status(201).json({
      success: true,
      data: review,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getReviewsForAsset = async (req, res) => {
  try {
    const { assetId } = req.params;

    const reviews = await Review.find({ assetUpload: assetId })
      .populate('officer', 'name mobileNumber role')
      .sort({ reviewedAt: -1 })
      .lean();

    res.json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getMyReviews = async (req, res) => {
  try {
    if (req.user.role !== 'OFFICER') {
      return res.status(403).json({ error: 'Only officers can see their reviews' });
    }

    const reviews = await Review.find({ officer: req.user._id })
      .populate({
        path: 'assetUpload',
        select: 'loan imageUrl status geoLocation',
        populate: { path: 'loan', select: 'loanNumber purpose amount' },
      })
      .sort({ reviewedAt: -1 })
      .lean();

    res.json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};