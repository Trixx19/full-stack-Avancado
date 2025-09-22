import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AdicionarProduto.css";

export default function AdicionarProduto() {
  const { id } = useParams(); // id do vendedor
  const navigate = useNavigate();

  const [produto, setProduto] = useState({
    nome: "",
    descricao: "",
    preco: "",
    quantidade: "",
    img: "",
  });

  const handleChange = (e) => {
    setProduto({ ...produto, [e.target.name]: e.target.value });
  };

  const handleSalvar = () => {
    console.log("Produto salvo (mock):", produto);
    alert("Produto salvo com sucesso!");
    navigate(`/vendedor/${id}`);
  };

  return (
    <div className="adicionar-container">
      <header className="adicionar-header">
        <h1>Adicionar Produto</h1>
        <button onClick={() => navigate(`/vendedor/${id}`)}>Voltar</button>
      </header>

      <div className="adicionar-form">
        <label>Nome do Produto</label>
        <input name="nome" value={produto.nome} onChange={handleChange} placeholder="Digite o nome" />

        <label>Descrição</label>
        <textarea name="descricao" value={produto.descricao} onChange={handleChange} placeholder="Digite a descrição" />

        <label>Preço</label>
        <input name="preco" value={produto.preco} onChange={handleChange} placeholder="R$ 0,00" />

        <label>Quantidade</label>
        <input name="quantidade" value={produto.quantidade} onChange={handleChange} placeholder="0" />

        <label>URL da Imagem</label>
        <input name="img" value={produto.img} onChange={handleChange} placeholder="https://..." />

        <button className="btn-salvar" onClick={handleSalvar}>Salvar Produto</button>
      </div>
    </div>
  );
}
