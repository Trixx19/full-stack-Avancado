// Código para src/pages/Products/Products.js
import React from 'react';
import ListProducts from '../../components/product/ListProducts'; // Importamos o componente da lista
import './Products.css';

function Products() {
  return (
    <div className="container">
      <h1 className="products-page-title">Todos os Produtos</h1>
      <ListProducts />
    </div>
  );
}

export default Products;