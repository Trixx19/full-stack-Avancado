import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CartProvider } from './contexts/CartContext';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

// O método render() inicia a aplicação
root.render(
  // React.StrictMode ajuda a encontrar potenciais problemas na aplicação
  <React.StrictMode>
    {/* BrowserRouter habilita a navegação baseada em URL (rotas) */}
    <BrowserRouter>
      {/* AuthProvider disponibiliza os dados de login para toda a aplicação */}
      <AuthProvider>
        {/* CartProvider disponibiliza os dados do carrinho para toda a aplicação */}
        <CartProvider>
          {/* App é o componente principal do seu site */}
          <App />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

