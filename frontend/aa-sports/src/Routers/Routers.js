import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Products from "../pages/Products/Products"; 
import CartPage from "../pages/Cartpage/CartPage";
import CheckoutPage from "../pages/CheckoutPage/CheckoutPage"; 
import Suplementos from "../pages/Suplementos/Suplementos"; 
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register"; // Importar a nova página

// Páginas de perfis
import ClientePage from "../pages/ClientePage";
import VendedorPage from "../pages/VendedorPage";
import AdicionarProduto from "../pages/AdicionarProduto";
import User from "../pages/User/UserPage"; // Importar o componente UserPage

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/produtos" element={<Products />} />
      <Route path="/carrinho" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/suplementos" element={<Suplementos />} />
      <Route path="/UserPage" element={<User />} /> 
      
      {/* Rotas de Autenticação */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} /> {/* Adicionar a nova rota */}

      {/* Rotas de cliente e vendedor */}
      <Route path="/cliente/:id" element={<ClientePage />} />
      <Route path="/vendedor/:id" element={<VendedorPage />} />
      <Route path="/vendedor/:id/adicionar" element={<AdicionarProduto />} />
    </Routes>
  );
};

export default Routers;
