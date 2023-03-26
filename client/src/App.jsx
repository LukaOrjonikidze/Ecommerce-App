import "./Modules/App.module.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from "./Pages/ProductList";
import AddProduct from "./Pages/AddProduct";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<ProductList />} />
        <Route path="/add-product" element={<AddProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
