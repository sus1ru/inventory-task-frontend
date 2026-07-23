import { useChangepasswordMutation } from "@/store/loginApi";
import { useState } from "react";
import { Link } from "react-router";

export default function ChangePassword() {
  const [formData, setFormData] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const [changePassword] = useChangepasswordMutation();

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    // if (formData.new_password !== formData.confirm_password) {
    //   alert("New passwords do not match");
    //   return;
    // }
    try{

        const data = await changePassword(formData).unwrap()
        setMessage("Password changed successfully");
        console.log("Password change request:", data);
    }
    catch(error){
        console.error("Error changing password:", error);
        setError(error?.data?.new_password[0])
    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">

        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Change Password
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Current Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Password
            </label>

            <input
              type="password"
              name="old_password"
              value={formData.old_password}
              onChange={handleChange}
              placeholder="Enter current password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>


          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>

            <input
              type="password"
              name="new_password"
              value={formData.new_password}
              onChange={handleChange}
              placeholder="Enter new password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>


          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm New Password
            </label>

            <input
              type="password"
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              placeholder="Confirm new password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
    {error && <p className="text-red-500 text-sm">{error}</p>}
    {message && <p className="text-green-500 text-sm">{message}</p>}
{
    !message ?
    (
         <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg 
            font-medium hover:bg-blue-700 transition"
          >
            Update Password
          </button>

    ) : (
         <Link
            to="/"
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg 
            font-medium hover:bg-blue-700 transition"
          >
            Home
          </Link>

    )
}
         

        </form>

      </div>
    </div>
  );
}