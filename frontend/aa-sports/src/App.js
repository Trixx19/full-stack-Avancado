import React from 'react';
import Routers from './Routers/Routers';
import { CartProvider } from './contexts/CartContext';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

function App() {
  return (
    <CartProvider>
      <Header />
      <Routers />
      <Footer />
    </CartProvider>
  );
}

export default App;
