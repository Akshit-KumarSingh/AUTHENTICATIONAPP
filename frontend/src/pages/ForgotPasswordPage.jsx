import { Mail, ArrowLeft, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import Input from "../components/Input";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { isLoading, forgotPassword } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
    setIsSubmitted(true);
  };

  return (
    <div className="max-w-md w-full bg-[#1e1e2f] rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-semibold text-white text-center mb-6">
        Forgot Password
      </h2>

      {!isSubmitted ? (
        <form onSubmit={handleSubmit}>
          <p className="text-sm text-gray-400 text-center mb-4">
            Enter your email to receive a reset link.
          </p>

          <Input
            icon={Mail}
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full mt-4 py-2 px-4 bg-[#3b3b4f] hover:bg-[#4c4c60] text-white font-medium rounded-md transition duration-200"
          >
            {isLoading ? (
              <Loader className="w-5 h-5 animate-spin mx-auto" />
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>
      ) : (
        <div className="text-center text-gray-300">
          <div className="w-14 h-14 rounded-full bg-[#3b3b4f] flex items-center justify-center mx-auto mb-4">
            <Mail className="w-6 h-6 text-white" />
          </div>
          <p>
            If an account exists for <span className="text-white">{email}</span>
            , a reset link will be sent.
          </p>
        </div>
      )}

      <div className="mt-6 flex justify-center">
        <Link
          to="/login"
          className="flex items-center text-sm text-gray-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
