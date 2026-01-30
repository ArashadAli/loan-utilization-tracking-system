import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    
    assetUpload: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AssetUpload',
      required: true,
    },

    officer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    decision: {
      type: String,
      enum: ['APPROVED', 'REJECTED'],
      required: true,
    },

    remarks: {
      type: String,
      trim: true,
    },

    reviewedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model('Review', reviewSchema);

export default Review