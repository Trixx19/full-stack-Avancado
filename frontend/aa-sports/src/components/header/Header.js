// Em frontend/aa-sports/src/components/header/Header.js (VERSÃO FINAL E CORRIGIDA)

import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';

import logo from '../../assets/icons/logo/logo.png';
import cart from '../../assets/icons/logo/cart.png';

import './Header.css';

function Header() {
  const { cartItems } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleProfileClick = () => {
      // Verificação de segurança: Só navega se 'user' existir
      if (user?.perfil === 'CLIENTE') {
          navigate(`/cliente/${user.id}`);
      } else if (user?.perfil === 'VENDEDOR') {
          navigate(`/vendedor/${user.id}`);
      }
  };

  return (
    <header className="header">
      <div className="header-container">
        <NavLink to="/" className="logo-link">
          <img src={logo} alt="AA-Sports Logo" className="logo-img" />
        </NavLink>

        <nav className="main-nav">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Home
          </NavLink>
          <NavLink to="/produtos" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Produtos
          </NavLink>
          <NavLink to="/suplementos" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Suplementos
          </NavLink>
        </nav>

        <div className="header-icons">
          <NavLink to="/carrinho" className="cart-link">
            <img src={cart} alt="Carrinho de compras" />
            {cartItems.length > 0 && <span className="cart-count">{cartItems.length}</span>}
          </NavLink>

          {isAuthenticated ? (
            <div className="user-info">
              {/* Verificação de segurança: Só mostra o nome se 'user' existir */}
              <span onClick={handleProfileClick} className="user-name-link">
                Olá, {user?.name}
              </span>
              <button onClick={logout} className="logout-button">Sair</button>
            </div>
          ) : (
            <NavLink to="/login" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Login
            </NavLink>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;