import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import BackgroundVideo from "../components/BackgroundVideo";

const Login = () => {
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    if (phone.length !== 10) {
      alert("Please enter your 10 digit phone number");
      return;
    }
    navigate("/otp", { state: { phone } });
  };

  return (
    <>
      {/* 🔥 Background Video */}
      <BackgroundVideo />

      <div className="min-h-screen flex items-center justify-center px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md p-8 rounded-2xl
                     bg-white/90 backdrop-blur-md
                     shadow-xl border border-green-200"
        >
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Welcome Back
          </h2>

          <p className="text-center text-sm text-gray-500 mt-2">
            Login using your phone number
          </p>

          <div className="mb-6 mt-6">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Phone Number
            </label>
            <motion.input
              whileFocus={{ scale: 1.03 }}
              type="tel"
              placeholder="Enter 10 digit phone number"
              maxLength={10}
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value.replace(/\D/g, ""))
              }
              className="w-full px-4 py-3 text-sm border border-green-300 rounded-xl
                         focus:outline-none focus:ring-2 focus:ring-[#8AFF8A]"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSendOtp}
            className="w-full py-3 rounded-xl font-semibold text-gray-900
                       bg-[#8AFF8A] hover:bg-green-400 transition-all"
          >
            Submit
          </motion.button>

          <p className="text-xs text-center text-gray-400 mt-4">
            Secure OTP-based authentication
          </p>
        </motion.div>
      </div>
    </>
  );
};

export default Login;
