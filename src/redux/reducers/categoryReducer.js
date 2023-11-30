// categorySlice.js
import { createSlice } from "@reduxjs/toolkit";
import { request } from "../../server";
import { toast } from "react-toastify";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    data: [],
    loading: false,
    modalOpen: false,
    selected: null,
    search: "",
    searchData: [],
  },
  reducers: {
    getDataSuccess: (state, action) => {
      state.data = action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setModalOpen: (state, action) => {
      state.modalOpen = action.payload;
    },
    setSelected: (state, action) => {
      state.selected = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setSearchData: (state, action) => {
      state.searchData = action.payload;
    },
    openModal: (state) => {
      state.modalOpen = true;
    },
    closeModal: (state) => {
      state.modalOpen = false;
    },
    editDataStart: (state) => {
      state.loading = true;
    },
    editDataSuccess: (state, action) => {
      const { data } = action.payload;
      state.loading = false;
      state.selected = data.id;
      state.modalOpen = true;
      state.editingData = data;
    },
    editDataError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteDataStart: (state) => {
      state.loading = true;
    },
    deleteDataSuccess: (state) => {
      state.loading = false;
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
    },
    deleteDataError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    handleSearch: (state, action) => {
      state.search = action.payload;
    },
    savePostSuccess: (state, action) => {
      state.loading = false;
      state.data = [...state.data, action.payload];
    },
  },
});

export const fetchData = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const { data } = await request.get("category");
    dispatch(getDataSuccess(data));
  } catch (error) {
    toast.error("Error fetching data:", error);
  } finally {
    dispatch(setLoading(false));
  }
};

export const filterData = () => async (dispatch, getState) => {
  try {
    const { data, search } = getState().category;
    const filteredData = data.filter(
      (item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase())
    );
    dispatch(setSearchData(filteredData));
  } catch (error) {
    toast.error("Error filtering data:", error);
  }
};

export const savePost = (postData, id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    let response;
    if (id) {
      response = await request.put(`posts/${id}`, postData);
    } else {
      response = await request.post("posts", postData);
    }

    dispatch(savePostSuccess(response.data));
    dispatch(fetchData());
    dispatch(setModalOpen(false));
  } catch (error) {
    console.error("Error saving post:", error);
  } finally {
    dispatch(setLoading(false));
  }
};
export const editData = (id) => async (dispatch) => {
  try {
    dispatch(editDataStart());

    const { data } = await request.get(`category/${id}`);

    dispatch(editDataSuccess({ data }));
  } catch (error) {
    dispatch(editDataError(error));
  }
};
export const deleteData = (id) => async (dispatch) => {
  try {
    dispatch(deleteDataStart());

    const check = window.confirm("Do you want to delete this product?");
    if (check) {
      await request.delete(`category/${id}`);
      dispatch(deleteDataSuccess());
      fetchData();
    }
  } catch (error) {
    console.error(error);

    dispatch(deleteDataError(error));
  }
};

export const {
  getDataSuccess,
  setLoading,
  setModalOpen,
  setSearch,
  setSelected,
  editDataStart,
  editDataSuccess,
  editDataError,
  setSearchData,
  openModal,
  closeModal,
  handleSearch,
  savePostSuccess,
  deleteDataSuccess,
  deleteDataError,
  deleteDataStart,
} = categorySlice.actions;
export default categorySlice.reducer;
