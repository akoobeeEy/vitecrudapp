import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { AiFillDelete, AiOutlineEdit } from "react-icons/ai";
import { MdOutlineReadMore } from "react-icons/md";

import {
  deleteData,
  editData,
} from "../../redux/reducers/categoryReducer";
import { useDispatch } from "react-redux";
export const Card = ({ name, image, description, price, comment, id }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const enterProduct = (id) => {
    navigate(`/category/${id}`);
    console.log(id);
  };
  const edit = (id) => {
    dispatch(editData(id));
  };

  const deletedData = (id) => {
    dispatch(deleteData(id));
  };
  return (
    <motion.div
      initial={{ y: 100, opacity: 0, scale: 0.5 }}
      whileInView={{ y: 0, opacity: 1, rotate: 0 }}
      animate={{
        scale: [1, 2, 2, 1, 1],
      }}
      transition={{ ease: "easeOut", duration: 1.3 }}
      className="pb-4 overflow-hidden bg-white rounded-md shadow-2xl group"
    >
      <img
        src={image}
        alt=""
        className="mb-3 h-[350px] lg:h-[250px] object-cover w-full hover:scale-105 duration-200"
      />
      <div className="p-4 ">
        <h2 className="mb-3 text-xl font-bold text-blue-950">{name}</h2>

        <div className="h-full xl:h-[144px]">
          <p className="w-full text-base font-medium text-blue-900">
            {description}
          </p>
          <div className="flex flex-col gap-2 my-3">
            <p className="text-xs font-bold text-red-500">{comment}</p>
            <p className="text-xs font-bold text-black">{price}$</p>
          </div>
        </div>

        <div className="flex justify-between mt-3">
          <motion.button
            onClick={() => edit(id)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center px-6 py-1 text-sm text-blue-600 duration-100 bg-white rounded-full hover:text-white hover:bg-blue-600 c"
          >
            Edit
            <span>
              {" "}
              <AiOutlineEdit className="ml-1 text-sm" />
            </span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => deletedData(id)}
            className="flex items-center px-6 py-1 text-sm text-red-500 duration-100 bg-white rounded-full hover:bg-red-500 hover:text-white"
          >
            Delete
            <span>
              <AiFillDelete className="ml-1 text-sm " />
            </span>
          </motion.button>
          <motion.button
            onClick={() => enterProduct(id)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center px-6 py-1 text-sm text-green-500 duration-100 bg-white rounded-full hover:bg-amber-500 hover:text-black"
          >
            More
            <span>
              <MdOutlineReadMore className="ml-1 text-sm" />
            </span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

Card.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.string,
  comment: PropTypes.string,
  id: PropTypes.string,
};
