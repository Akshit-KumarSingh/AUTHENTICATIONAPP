import { useState } from "react";
import { Mail, Lock, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import { useAuthStore } from "../store/authStore";
import { toast } from "react-hot-toast"; // ✅ toast import

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success("Login successful ✅");
    } catch (err) {
      toast.error(err.message || "Login failed ❌");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#1F1D1B] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-[#2B2927] p-6 md:p-8 rounded-2xl shadow-md border border-[#3b3a37]">
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            icon={Mail}
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            icon={Lock}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex justify-end">
            <Link
              to="/forgot-password"
              className="text-sm text-[#F0F2BD] hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {error && <p className="text-red-500 font-semibold">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-[#F0F2BD] text-black font-semibold rounded-lg hover:bg-[#e2e4aa] transition"
          >
            {isLoading ? (
              <Loader className="w-5 h-5 animate-spin mx-auto" />
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
