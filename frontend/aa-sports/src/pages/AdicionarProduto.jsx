// Em frontend/aa-sports/src/pages/AdicionarProduto.jsx (VERSÃO FINAL E CORRIGIDA)

import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AdicionarProduto.css";

export default function AdicionarProduto() {
  const { id } = useParams();
  const navigate = useNavigate();

  // 1. O estado agora reflete exatamente o que o backend espera
  const [produto, setProduto] = useState({
    sku: "",
    name: "",
    description: "",
    price: "",
    stock: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduto(prevState => ({
        ...prevState,
        [name]: value
    }));
  };

  // 2. A função de salvar agora é assíncrona e faz a chamada para a API
  const handleSalvar = async () => {
    // Pega o token do vendedor que está logado
    const token = localStorage.getItem('token');
    if (!token) {
        alert("Sessão expirada. Por favor, faça o login novamente.");
        navigate('/login');
        return;
    }

    try {
        const response = await fetch('http://localhost:4000/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Envia o token para autorização
            },
            body: JSON.stringify(produto), // Envia os dados do produto
        });

        const data = await response.json();

        if (!response.ok) {
            // Se o backend retornar um erro (ex: SKU duplicado), ele será mostrado
            throw new Error(data.error || 'Não foi possível salvar o produto.');
        }

        console.log("Produto salvo:", data);
        alert("Produto salvo com sucesso!");
        navigate(`/vendedor/${id}`); // Volta para o painel do vendedor

    } catch (error) {
        console.error("Erro ao salvar produto:", error);
        alert(error.message);
    }
  };

  return (
    <div className="adicionar-container">
      <header className="adicionar-header">
        <h1>Adicionar Produto</h1>
        <button onClick={() => navigate(`/vendedor/${id}`)}>Voltar</button>
      </header>

      {/* 3. O formulário agora tem todos os campos necessários */}
      <div className="adicionar-form">
        <label>SKU (Código Único do Produto)</label>
        <input name="sku" value={produto.sku} onChange={handleChange} placeholder="Ex: CAM-N-PT-001" />

        <label>Nome do Produto</label>
        <input name="name" value={produto.name} onChange={handleChange} placeholder="Digite o nome do produto" />

        <label>Descrição</label>
        <textarea name="description" value={produto.description} onChange={handleChange} placeholder="Fale sobre o produto" />

        <label>Preço (Ex: 29.99)</label>
        <input name="price" type="number" value={produto.price} onChange={handleChange} placeholder="0.00" />

        <label>Quantidade em Estoque</label>
        <input name="stock" type="number" value={produto.stock} onChange={handleChange} placeholder="0" />

        <label>Nome do Arquivo da Imagem (Ex: 1.jpg)</label>
        <input name="image" value={produto.image} onChange={handleChange} placeholder="nome-da-imagem.jpg" />

        <button className="btn-salvar" onClick={handleSalvar}>Salvar Produto</button>
      </div>
    </div>
  );
}