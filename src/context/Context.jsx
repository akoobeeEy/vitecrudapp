import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { request } from "../server";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const Context = ({ children }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const { register, handleSubmit, reset } = useForm();
  const [data, setData] = useState([]);

  async function getData() {
    try {
      let { data } = await request("category");
      setData(data);
    } catch (err) {
      toast(err);
    }
  }
  useEffect(() => {
    getData();
  }, []);

  const close = () => setModalOpen(false);

  const open = () => {
    setSelected(null);
    setModalOpen(true);
    reset({
      name: "",
      image: "",
      price: "",
      comment: "",
      data: "",
    
    });
  };
  const onSubmit = async (data) => {
    try {
      if (selected === null) {
        await request.post("category", data);
      } else {
        await request.put(`category/${selected}`, data);
      }
      getData();
      close();
    } catch (err) {
      toast.error(err);
    }
  };
  const editData = async (id) => {
    try {
      setSelected(id);
      setModalOpen(true);
      let { data } = await request(`category/${id}`);
      console.log(data);
      reset({
        name: data.name,
        image: data.image,
        price: data.price,
        comment: data.comment,
        description: data.description,
        data: data.data,
      });
    } catch (err) {
      toast(err);
    }
  };
  const deleteData = async (id) => {
    let check = window.confirm("Do you want to launch this product?");
    try {
      if (check) {
        await request.delete(`category/${id}`);
        getData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const state = {
    modalOpen,
    setModalOpen,
    selected,
    setSelected,
    open,
    close,
    register,
    handleSubmit,
    onSubmit,
    data,
    editData,
    deleteData
  };

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
};
Context.propTypes = {
  children: PropTypes.node,
};
