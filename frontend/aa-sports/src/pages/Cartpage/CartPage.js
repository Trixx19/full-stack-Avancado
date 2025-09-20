// VERSÃO FINAL E CORRIGIDA (SEM A DIV EXTRA) para src/pages/Cartpage/CartPage.js
import React from 'react';
import { useCart } from '../../contexts/CartContext';
import { Link } from 'react-router-dom';
import './CartPage.css';

const CartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="empty-cart-icon">
      <circle cx="9" cy="21" r="1"></circle>
      <circle cx="20" cy="21"r="1"></circle>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
    </svg>
);

function CartPage() {
  const { cartItems, removeFromCart } = useCart();
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  return (
      <div className="cart-page">
        {cartItems.length === 0 ? (
          <div className="empty-cart-container">
            <CartIcon />
            <h2 className="empty-cart-title">Seu carrinho está vazio</h2>
            <p className="empty-cart-subtitle">Que tal explorar nossos produtos em destaque?</p>
            <Link to="/produtos" className="explore-button">
              Explorar produtos
            </Link>
          </div>
        ) : (
          <>
            <h2 className="cart-title">Meu Carrinho</h2>
            <div className="cart-container">
              {/* Coluna da Esquerda: Itens do Carrinho */}
              <div className="cart-items-list">
                {cartItems.map((item, index) => (
                  <div key={index} className="cart-item">
                    {/* Alteração: Corrigindo o caminho da imagem */}
                    <img src={`/images/products/${item.image}`} alt={item.name} />
                    <div className="item-details">
                      <h3>{item.name}</h3>
                      <p className="item-price">R$ {item.price.toFixed(2).replace('.', ',')}</p>
                    </div>
                    <button onClick={() => removeFromCart(index)} className="remove-button">
                      Remover
                    </button>
                  </div>
                ))}
              </div>
              {/* Coluna da Direita: Resumo do Pedido */}
              <div className="cart-summary">
                <h3>Resumo do Pedido</h3>
                <div className="summary-total">
                  <span>Total</span>
                  <strong>R$ {totalPrice.toFixed(2).replace('.', ',')}</strong>
                  </div>
                    <Link to="/checkout" className="checkout-button">
                    Finalizar Compra
                    </Link>
                  </div>
            </div>
          </>
        )}
      </div>
  );
}

export default CartPage;