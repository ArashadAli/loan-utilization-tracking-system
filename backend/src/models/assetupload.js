import mongoose from "mongoose";

const assetUploadSchema = new mongoose.Schema(
  {
    loan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Loan',
      required: true,
    },

    beneficiary: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    imageUrl: {
      type: String,
      required: true,
    },

    geoLocation: {
      latitude: {
        type: Number,
        required: true,
      },
      longitude: {
        type: Number,
        required: true,
      },
      accuracy: {
        type: Number,
      },
      capturedAt: {
        type: Date,
        default: Date.now,
      },
    },

    aiSimilarityScore: {
      type: Number,
      default: 0,
    },

    duplicateFlag: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ['PENDING', 'APPROVED', 'REJECTED'],
      default: 'PENDING',
    },
  },
  {
    timestamps: true,
  }
);


const UploadAsset = mongoose.model('AssetUpload', assetUploadSchema);

export default UploadAsset