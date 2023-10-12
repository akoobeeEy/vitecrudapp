import { motion } from "framer-motion";
import PropTypes from "prop-types";
export const Backdrop = ({ children, onClick }) => {
  return (
    <motion.div
      className="backdrop "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};
Backdrop.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
};
