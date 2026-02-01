import axios from "axios";

export const sendOtpSMS = async (mobileNumber, otp) => {
  try {
    await axios.post(
      "https://www.fast2sms.com/dev/bulkV2",
      {
        route: "q", // 👈 NOT otp
        message: `Your OTP is ${otp}. Valid for 2 minutes.`,
        numbers: mobileNumber,
      },
      {
        headers: {
          authorization: process.env.FAST2SMS_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err) {
    console.error(err.response?.data || err.message);
  }
};