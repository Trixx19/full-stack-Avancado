// src/components/ProductCarousel.jsx
import React from "react";
import "./Carrosel.css";
import { promoProducts } from "../../data/PromoPraducts";

const ProductCarrosel = () => {
    return (
        <div className="carousel-container">
        <h2 className="carousel-title">🔥 Ofertas Relâmpago</h2>
        <div className="carousel">
            {promoProducts.map((prod) => (
            <div key={prod.id} className="carousel-card">
                <img src={prod.imagem} alt={prod.nome} />
                <span className="badge">-{prod.desconto}% OFF</span>
                <p className="nome">{prod.nome}</p>
                <p className="preco-original">R$ {prod.precoOriginal.toFixed(2)}</p>
                <p className="preco-desconto">
                R$ {prod.precoDesconto.toFixed(2)} <small>no Pix</small>
                </p>
                <p className="parcelas">ou {prod.parcelas}</p>
                {prod.frete && <span className="frete">Frete grátis</span>}
            </div>
            ))}
        </div>
        </div>
    );
    };

export default ProductCarrosel;
