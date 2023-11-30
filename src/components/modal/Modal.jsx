import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { SiNamecheap } from "react-icons/si";
import { GiScrollUnfurled } from "react-icons/gi";
import { MdPriceChange } from "react-icons/md";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { FaAudioDescription } from "react-icons/fa";

import {
  closeModal,
  savePostSuccess,
} from "../../redux/reducers/categoryReducer";
import { Backdrop } from "../backdrop";
import { useDispatch, useSelector } from "react-redux";

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 1,
  },
};
export const Modal = () => {
  const { selected } = useSelector((state) => state.category);
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const close = () => dispatch(closeModal());
  const onSubmit = (data) => {
    dispatch(savePostSuccess(data));
    close();
  };

  return (
    <Backdrop onClick={close}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial="hidden"
        drag
        animate="visible"
        exit="exit"
        variants={dropIn}
        className="bg-white cursor-move modal"
      >
        <div className="flex justify-between py-2 ">
          <div className="flex justify-center">
            <h1 className="text-2xl font-bold text-center text-green-500">
              Post Data
            </h1>
          </div>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9, rotate: -90 }}
            className=""
            onClick={close}
          >
            <AiOutlineClose className="text-3xl font-bold text-green-500" />
          </motion.button>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          action=""
          className="flex flex-col py-4"
        >
          <div className="px-10 modal-body">
            <div className="flex items-center h-10 p-3 mb-3 bg-green-500 rounded-md w-[70%]">
              <SiNamecheap className="mr-2 text-white" />
              <input
                {...register("name")}
                name="name"
                type="text"
                className="modal-input"
                placeholder="Enter post name"
              />
            </div>
            <div className="flex items-center h-10 p-3 mb-3 bg-green-500 rounded-md w-[70%]">
              <FaAudioDescription className="mr-2 text-white" />
              <input
                {...register("description")}
                name="description"
                type="text"
                className="modal-input"
                placeholder="Enter post description"
              />
            </div>
            <div className="flex items-center h-10 p-3 mb-3 bg-green-500 rounded-md w-[70%]">
              <GiScrollUnfurled className="mr-2 text-white" />
              <input
                {...register("image")}
                name="image"
                type="url"
                className="modal-input"
                placeholder="Enter image url"
              />
            </div>
            <div className="flex items-center h-10 p-3 mb-3 bg-green-500 rounded-md w-[70%]">
              <MdPriceChange className="mr-2 text-white" />
              <input
                {...register("price")}
                name="price"
                type="number"
                className="modal-input"
                placeholder="Enter post price"
              />
            </div>
            <div className="flex p-3 mb-3 bg-green-500 rounded-md h-14 w-[70%]">
              <BiCommentDetail className="mr-2 text-white" />
              <textarea
                {...register("comment")}
                name="comment"
                type="text"
                className="resize-none modal-input"
                placeholder="Enter comment"
              />
            </div>
            <div className="flex items-center h-10 p-3 mb-3 bg-green-500 rounded-md w-[70%]">
              <BsFillCalendarDateFill className="mr-2 text-white" />
              <input
                {...register("data")}
                name="data"
                type="date"
                className="modal-input"
              />
            </div>
          </div>
          <div className="px-10 modal-footer">
            <button
              type="submit"
              className="px-8 py-2 text-green-500 bg-white border-2 border-green-500 rounded-full"
            >
              {selected ? "Save" : "Add"} Post
            </button>
          </div>
        </form>
      </motion.div>
    </Backdrop>
  );
};

Modal.propTypes = {
  handleClose: PropTypes.func,
};
