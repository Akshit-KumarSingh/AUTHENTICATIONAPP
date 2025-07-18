import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../components/Input";
import { Lock } from "lucide-react";
import toast from "react-hot-toast";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { resetPassword, error, isLoading, message } = useAuthStore();

  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await resetPassword(token, password);
      toast.success("Password reset successfully, redirecting...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      toast.error(error.message || "Error resetting password");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#1F1D1B] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-[#2B2927] p-6 md:p-8 rounded-2xl shadow-md border border-[#3b3a37]">
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          Reset Password
        </h2>

        {error && <p className="text-red-500 font-medium mb-4">{error}</p>}
        {message && <p className="text-blue-400 font-medium mb-4">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            icon={Lock}
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Input
            icon={Lock}
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-[#F0F2BD] text-black font-semibold rounded-lg hover:bg-[#e2e4aa] transition"
          >
            {isLoading ? "Resetting..." : "Set New Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
