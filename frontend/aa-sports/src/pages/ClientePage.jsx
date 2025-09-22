import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ClientePage.css";
import banner from "../assets/banner.webp"; // ajuste o caminho

export default function ClientePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const compras = [
    {
      id: 1,
      nome: "Tênis Nike Air Max",
      status: "Entregue",
      img: "https://images.unsplash.com/photo-1618354692855-c87d22652c2c?auto=format&fit=crop&w=400&q=80",
      preco: "R$ 450,00",
      quantidade: 1,
    },
    {
      id: 2,
      nome: "Camiseta Esportiva Adidas",
      status: "Em transporte",
      img: "https://images.unsplash.com/photo-1618354692847-c55a1b6b021d?auto=format&fit=crop&w=400&q=80",
      preco: "R$ 120,00",
      quantidade: 2,
    },
    {
      id: 3,
      nome: "Mochila Puma",
      status: "Preparando envio",
      img: "https://images.unsplash.com/photo-1618354692823-d2296b4bb9e1?auto=format&fit=crop&w=400&q=80",
      preco: "R$ 250,00",
      quantidade: 1,
    },
  ];

  return (
    <div className="cliente-container">
      {/* Banner */}
      <div className="cliente-banner">
        <img src={banner} alt="Banner Cliente" />
        <button className="btn-sair" onClick={() => navigate("/")}>Sair</button>
      </div>

      <h2 className="section-title">Histórico de Compras</h2>

      <div className="compras-grid">
        {compras.map((item) => (
          <div key={item.id} className="compra-card">
            <div className="card-img">
              <img src={item.img} alt={item.nome} />
            </div>
            <div className="card-info">
              <h3>{item.nome}</h3>
              <p>Quantidade: {item.quantidade}</p>
              <p>Preço: {item.preco}</p>
              <span className={`status ${item.status.replace(/\s+/g, "").toLowerCase()}`}>
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
