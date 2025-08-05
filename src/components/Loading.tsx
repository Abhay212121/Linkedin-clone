import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-[#0077b5]">
      <motion.div
        className="flex items-center space-x-2"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.6,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <div className="w-4 h-4 bg-[#0077b5] rounded-full animate-bounce"></div>
        <div className="w-4 h-4 bg-[#0077b5] rounded-full animate-bounce delay-150"></div>
        <div className="w-4 h-4 bg-[#0077b5] rounded-full animate-bounce delay-300"></div>
      </motion.div>

      <motion.h2
        className="mt-6 text-xl font-semibold"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Loading your personalized feed...
      </motion.h2>
    </div>
  );
};

export default Loading;
