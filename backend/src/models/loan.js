import mongoose from "mongoose";

const loanSchema = new mongoose.Schema(
  {
    beneficiary: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    loanNumber: {
      type: String,
      required: true,
      unique: true,
      index: true
    },

    amount: {
      type: Number,
      required: true,
      min: 0
    },

    purpose: {
      type: String,
      required: true,
      trim: true
    },

    sanctionedLocation: {
      district: {
        type: String,
        required: true,
        trim: true
      },
      state: {
        type: String,
        required: true,
        trim: true
      }
    },

    status: {
      type: String,
      enum: ["PENDING", "ACTIVE", "COMPLETED", "CLOSED"],
      default: "PENDING"
    },

    sanctionedAt: {
      type: Date,
      default: Date.now
    },

    completedAt: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);


const Loan = mongoose.model("Loan",loanSchema)

export default Loan
