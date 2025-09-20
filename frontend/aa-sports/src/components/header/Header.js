import React from 'react';
import { NavLink } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { FaUserCircle } from 'react-icons/fa';

import logo from '../../assets/icons/logo/logo.png';
import cart from '../../assets/icons/logo/cart.png';

import './Header.css';

function Header() {
  const { cartItems } = useCart();

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

          <NavLink to="/login" className="user-link">
            <FaUserCircle size={28} />
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export default Header;
