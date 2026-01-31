import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // console.log(".env : ", process.env.MONGODB_URI)
    await mongoose.connect(process.env.MONGODB_URI + "/Loan-Utilization-System");
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('Database connection failed:', err.message);
    process.exit(1); // Exit if connection fails
  }
};

export default connectDB


