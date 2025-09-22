import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./VendedorPage.css";

export default function VendedorPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [produtos] = useState([
    { id: 1, nome: "Chuteira Puma", preco: "R$ 350", qtd: 10 },
    { id: 2, nome: "Bola de Futebol", preco: "R$ 120", qtd: 25 },
  ]);

  return (
    <div className="vendedor-container">
      <aside className="sidebar">
        <h2>PAINEL DO VENDEDOR</h2>
        <button onClick={() => navigate(`/vendedor/${id}/adicionar`)}>Adicionar Produto</button>
        <button onClick={() => navigate("/")}>Sair</button>
      </aside>

      <main className="content">
        <h1>SEUS PRODUTOS</h1>
        <table className="produtos-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Preço</th>
              <th>Quantidade</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((p) => (
              <tr key={p.id}>
                <td>{p.nome}</td>
                <td>{p.preco}</td>
                <td>{p.qtd}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
