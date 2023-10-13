import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { request } from "../server";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const Context = ({ children }) => {
  const [data, setData] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  const [selected, setSelected] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [searchedData, setSearchedData] = useState([]);

  async function getData() {
    try {
      setLoading(true);
      let response = await request.get("category", {
        params: {
          search: search,
        },
      });
      setData(response.data);
    } catch (err) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, [search]);

  const close = () => setModalOpen(false);

  const open = () => {
    setSelected(null);
    setModalOpen(true);
    reset({
      name: "",
      description: "",
      image: "",
      price: "",
      comment: "",
      data: "",
    });
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      if (selected === null) {
        await request.post("category", data);
      } else {
        await request.put(`category/${selected}`, data);
      }
      getData();
      close();
    } catch (err) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  const editData = async (id) => {
    try {
      setLoading(true);
      setSelected(id);
      setModalOpen(true);
      let { data } = await request(`category/${id}`);
      reset({
        name: data.name,
        image: data.image,
        price: data.price,
        comment: data.comment,
        description: data.description,
        data: data.data,
      });
    } catch (err) {
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteData = async (id) => {
    let check = window.confirm("Do you want to launch this product?");
    try {
      setLoading(true);
      if (check) {
        await request.delete(`category/${id}`);
        toast.success("Congratulations, it's done", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        getData();
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const filteredData = data.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase())
    );
    setSearchedData(filteredData);
  }, [data, search]);

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
    data: searchedData,
    editData,
    deleteData,
    loading,
    setSearch,
    handleSearch,
    search,
  };

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
};

Context.propTypes = {
  children: PropTypes.node,
};