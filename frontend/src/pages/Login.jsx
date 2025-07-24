import { useState } from "react";
import API from "../api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post(`/user/login`, { email, password });
      if (res.data.success) {
        const { token, user } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", user);
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      console.log("Error in Login ", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-center text-blue-600 font-bold text-3xl mb-6">
          My Drive
        </h1>
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              name="email"
            />
          </div>
          <div>
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              type="password"
              className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              name="password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
