import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI +"/Loan-Utilizaion-System");
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('Database connection failed:', err.message);
    process.exit(1); // Exit if connection fails
  }
};

export default connectDB;
