import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { Home } from "./pages/home";
import { CategoryDetails } from "./pages/category";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:id" element={<CategoryDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
