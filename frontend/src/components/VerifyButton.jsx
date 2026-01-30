import { motion } from "framer-motion";

const VerifyButton = ({ timeLeft, onVerify }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      disabled={timeLeft <= 0}
      onClick={onVerify}
      className={`w-full py-2 rounded-lg font-semibold transition
        ${
          timeLeft > 0
            ? "bg-[#8AFF8A] text-black hover:bg-green-400"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
    >
      Verify OTP
    </motion.button>
  );
};

export default VerifyButton;
