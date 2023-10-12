import { useContext } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { Modal } from "../../components/modal";
import { AppContext } from "../../context";
import { Card } from "../../components/card";

export const Home = () => {
  const { modalOpen, open, close } = useContext(AppContext);
  const { data } = useContext(AppContext);
  return (
    <div className="py-10 ">
      <div className="container mx-auto">
        <div className="flex items-center justify-between w-full gap-10 mb-20">
          <span className="text-red-500">PRODUCT: {data.length} </span>
          <div className="w-[700px] h-10">
            <input
              type="text"
              className="w-full h-full px-4 text-white bg-green-500 rounded-md shadow-2xl outline-none shadow-green-300"
              placeholder="Search..."
            />
          </div>
          <motion.button
            onClick={() => (modalOpen ? close() : open())}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="px-12 py-2 text-white bg-green-500 rounded-md shadow-2xl shadow-white"
          >
            Add
          </motion.button>
          <AnimatePresence initial={false} onExitComplete={() => null}>
            {modalOpen && (
              <Modal
                className={`fixed inset-0 flex items-center justify-center ${
                  modalOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
                modalOpen={modalOpen}
                handleClose={close}
              />
            )}
          </AnimatePresence>
        </div>

        {/* Card */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {data.map((el) => (
            <Card key={el.id} {...el} />
          ))}
        </div>
      </div>
    </div>
  );
};
