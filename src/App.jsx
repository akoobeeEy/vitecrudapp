import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import {Home} from "./pages/home";
import { Products } from "./pages/products";

function App() {
  return (
    <BrowserRouter>
    <ToastContainer/>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
