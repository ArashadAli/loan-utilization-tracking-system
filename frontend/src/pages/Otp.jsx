import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import OtpInput from "../components/OtpInput.jsx";
import OtpTimer from "../components/OtpTimer.jsx";
import VerifyButton from "../components/VerifyButton.jsx";

const Otp = () => {
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const navigate = useNavigate();

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleVerify = () => {
    const res = {
      data: {
        role: "USER",
        token: "dummy-token",
      },
    };

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("role", res.data.role);

    navigate(
      res.data.role === "USER"
        ? "/user-dashboard"
        : "/officer-dashboard"
    );
  };

  return (
    <div className="h-screen flex items-center justify-center bg-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-[380px] p-6 rounded-xl shadow-lg border border-green-200"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
          OTP Verification
        </h2>

        <p className="text-center text-sm text-gray-500 mb-5">
          Enter the OTP sent to your phone
        </p>

        {/* Components */}
        <OtpInput otp={otp} setOtp={setOtp} />
        <OtpTimer timeLeft={timeLeft} />
        <VerifyButton timeLeft={timeLeft} onVerify={handleVerify} />
      </motion.div>
    </div>
  );
};

export default Otp;
