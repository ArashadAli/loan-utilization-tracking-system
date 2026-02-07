const OtpTimer = ({ timeLeft, onResend }) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  // Countdown running
  if (timeLeft > 0) {
    return (
      <p className="text-sm text-center mb-4 text-gray-500">
        OTP valid for {minutes}:{seconds.toString().padStart(2, "0")}
      </p>
    );
  }

  // Time over → Resend link
  return (
    <p className="text-sm text-center mb-4 text-red-500">
      OTP expired.{" "}
      <button
        type="button"
        onClick={onResend}
        className="text-green-600 font-medium hover:underline"
      >
        Resend OTP
      </button>
    </p>
  );
};

export default OtpTimer;
