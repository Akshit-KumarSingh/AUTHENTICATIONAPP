import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#F0F2BD" }}
    >
      {/* Spinner */}
      <motion.div
        className="w-16 h-16 border-4 border-t-4 border-t-[#CA7842] border-[#F0F2BD] rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

export default LoadingSpinner;
