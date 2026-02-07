import { useState } from "react";

const OfficerDashboard = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleAddUser = () => {
    // POST to backend later
    alert("User Added (Backend Call)");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Officer Dashboard</h1>

      <input
        className="border p-2 block mb-2"
        placeholder="User Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="border p-2 block mb-4"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <button
        onClick={handleAddUser}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add User
      </button>
    </div>
  );
};

export default OfficerDashboard;