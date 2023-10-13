import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export const CategoryDetails = () => {
  const navigate = useNavigate();

  return (
    <div className="flex p-20">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => navigate("/")}
        className="px-5 py-3 text-white bg-blue-950"
      >
        Back To Home
      </motion.button>
    </div>
  );
};
