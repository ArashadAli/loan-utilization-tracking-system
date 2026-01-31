import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login.jsx";
import Otp from "./pages/Otp.jsx";
import UserDashboard from "./pages/UserDashboard.jsx";
import OfficerDashboard from "./pages/OfficerDashboard.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
       <Route path="/" element={<Login />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/officer-dashboard" element={<OfficerDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;