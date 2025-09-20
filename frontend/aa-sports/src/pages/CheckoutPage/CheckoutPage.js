// Código para src/pages/CheckoutPage/CheckoutPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './CheckoutPage.css';

// Ícone de sucesso para dar um toque visual
const SuccessIcon = () => (
  <svg className="success-icon" xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

function CheckoutPage() {
  return (
    <div className="container">
      <div className="checkout-container">
        <SuccessIcon />
        <h1 className="checkout-title">Compra Finalizada com Sucesso!</h1>
        <p className="checkout-message">
          Obrigado por comprar na AA Sports! O seu pedido está a ser processado e em breve receberá uma confirmação no seu e-mail.
        </p>
        <Link to="/" className="back-to-home-button">
          Voltar à Página Inicial
        </Link>
      </div>
    </div>
  );
}

export default CheckoutPage;