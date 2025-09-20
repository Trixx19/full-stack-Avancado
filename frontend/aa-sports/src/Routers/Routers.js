import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Products from "../pages/Products/Products"; 
import CartPage from "../pages/Cartpage/CartPage";
import CheckoutPage from "../pages/CheckoutPage/CheckoutPage"; 
import Suplementos from "../pages/Suplementos/Suplementos"; 
import Login from "../pages/Login/Login"; // ✅ nova importação

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/produtos" element={<Products />} />
      <Route path="/carrinho" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/suplementos" element={<Suplementos />} />
      <Route path="/login" element={<Login />} /> {/* ✅ nova rota */}
    </Routes>
  );
};

export default Routers;
