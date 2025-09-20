// src/components/card/ProductCard.js
import React from "react";
import "./ProductCard.css";
import { useCart } from "../../contexts/CartContext";

export default function ProductCard({ product }) { // Receba o objeto completo do produto
    const { addToCart } = useCart(); // Obtenha a função do contexto

    return (
        <div className="product-card">
            <img src={`/images/products/${product.image}`} alt={product.name} className="product-image"/>
            <h3>{product.name}</h3>
            <p className="price">R${product.price.toFixed(2)}</p>
            <button onClick={() => addToCart(product)} className="btn-add">
                Adicionar ao Carrinho
            </button>
        </div>
    );
}