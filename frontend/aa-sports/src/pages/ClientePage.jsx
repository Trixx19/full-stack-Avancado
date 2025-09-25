import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ClientePage.css";
import banner from "../assets/banner.webp"; // Certifique-se que o caminho está correto

export default function ClientePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Estados para armazenar os dados vindos da API
  const [cliente, setCliente] = useState(null);
  const [compras, setCompras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Função que busca os dados do cliente e suas compras no backend
    const fetchClienteData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Você não está logado.");
        }

        // 1. Busca os dados do cliente logado
        const clienteResponse = await fetch(`http://localhost:4000/api/cliente/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!clienteResponse.ok) {
          throw new Error(`Falha ao buscar dados do cliente (Status: ${clienteResponse.status})`);
        }
        const clienteData = await clienteResponse.json();
        setCliente(clienteData);

        // 2. Busca o histórico de compras
        const comprasResponse = await fetch(`http://localhost:4000/api/orders/cliente`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!comprasResponse.ok) {
          throw new Error(`Falha ao buscar histórico de compras (Status: ${comprasResponse.status})`);
        }
        const comprasData = await comprasResponse.json();
        setCompras(comprasData);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClienteData();
  }, [id]);

  // Exibe mensagens de carregamento ou erro
  if (loading) {
    return <div>Carregando sua página...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <div className="cliente-container">
      {/* Banner (do seu código antigo) */}
      <div className="cliente-banner">
        <img src={banner} alt="Banner Cliente" />
        <button className="btn-sair" onClick={() => navigate("/")}>Sair</button>
      </div>

      {/* Saudação com o nome do cliente vindo da API */}
      {cliente && <h1 className="welcome-title">Bem-vindo(a), {cliente.name}!</h1>}

      <h2 className="section-title">Seu Histórico de Compras</h2>

      {/* Grid de Compras (layout do seu código antigo) */}
      <div className="compras-grid">
        {compras.length > 0 ? (
          compras.map((pedido) => (
            // O card agora representa um PEDIDO, que pode ter vários produtos
            <div key={pedido.id} className="compra-card">
              <div className="card-info">
                <h3>Pedido #{pedido.id}</h3>
                <p>Data: {new Date(pedido.createdAt).toLocaleDateString()}</p>
                <p>Total: R$ {pedido.total.toFixed(2)}</p>
                <span className={`status ${pedido.status.replace(/\s+/g, "").toLowerCase()}`}>
                  {pedido.status}
                </span>

                {/* Lista de produtos dentro do pedido */}
                <div className="produtos-no-pedido">
                  <h4>Produtos neste pedido:</h4>
                  <ul>
                    {pedido.products.map(item => (
                      <li key={item.product.id}>
                        <img src={item.product.imageUrl} alt={item.product.name} className="produto-img-thumbnail" />
                        <div>
                          <strong>{item.product.name}</strong>
                          <p>{item.quantity} x R$ {item.product.price.toFixed(2)}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Você ainda não fez nenhuma compra.</p>
        )}
      </div>
    </div>
  );
}