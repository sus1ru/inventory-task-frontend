import { useLoginMutation } from "@/store/loginApi";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [login] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // simple validation`
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    

    // mock login check (replace with backend later)
    
    try {
      const data = await login({ username: email, password }).unwrap();
      console.log("Login successful", data);
      localStorage.setItem("token",data.token);
      window.location.href = "/"
    } catch (err) {
      console.error("Login failed", err);
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">

        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Welcome Back 👋
        </h2>
        <p className="text-sm text-gray-500 text-center mt-1">
          Login to your account
        </p>

        {/* Error Message */}
        {error && (
          <div className="mt-4 bg-red-100 text-red-600 text-sm px-4 py-2 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">

          <input
            type="name"
            placeholder="Name"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Forgot password?
        </p>
      </div>
    </div>
  );
}