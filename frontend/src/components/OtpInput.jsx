import { useState } from "react";
import { Input } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

const OtpInput = ({ otp, setOtp }) => {
  const [showOtp, setShowOtp] = useState(false);

  return (
    <div className="mb-3 flex items-center gap-3">
      <Input.OTP
        length={6}
        value={otp}
        onChange={(val) => setOtp(val)}
        formatter={(value) => {
          if (!value) return "";
          return showOtp ? value : value.split("").map(() => "•").join("");
        }}
        className="otp-square"
      />
    </div>
  );
};

export default OtpInput;
