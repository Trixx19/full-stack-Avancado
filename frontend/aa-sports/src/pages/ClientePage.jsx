// Em frontend/aa-sports/src/pages/ClientePage.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './ClientePage.css';

export default function ClientePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [cliente, setCliente] = useState(null);
    const [pedidos, setPedidos] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return; // Para a execução se não houver token
        }

        // Função para buscar os dados do cliente
        // MOVIDA PARA DENTRO DO USEEFFECT
        const fetchClienteData = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/cliente/${id}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (!response.ok) {
                    throw new Error(`Falha ao buscar dados do cliente (Status: ${response.status})`);
                }
                const data = await response.json();
                setCliente(data);
            } catch (err) {
                setError(err.message);
                console.error(err);
            }
        };

        // Função para buscar o histórico de pedidos
        // MOVIDA PARA DENTRO DO USEEFFECT
        const fetchOrdersData = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/orders/cliente', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (!response.ok) {
                    throw new Error(`Falha ao buscar histórico de pedidos (Status: ${response.status})`);
                }
                const data = await response.json();
                setPedidos(data);
            } catch (err) {
                setError(err.message);
                console.error(err);
            }
        };

        fetchClienteData();
        fetchOrdersData();

    }, [id, navigate]); // Agora as dependências estão corretas!

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // ... (o resto do seu código JSX continua o mesmo)
    if (error) {
        return <div className="cliente-container"><p className="error-message">Erro: {error}</p></div>;
    }

    if (!cliente) {
        return <div className="cliente-container"><p>Carregando...</p></div>;
    }

    return (
        <div className="cliente-container">
            <aside className="sidebar">
                <h2>PAINEL DO CLIENTE</h2>
                <p>Bem-vindo(a),</p>
                <h3>{cliente.name}</h3>
                <button onClick={handleLogout}>Sair</button>
            </aside>
            <main className="content">
                <h2>Meu Histórico de Compras</h2>
                <div className="pedidos-list">
                    {pedidos.length > 0 ? (
                        pedidos.map((pedido) => (
                            <div key={pedido.id} className="pedido-card">
                                <div className="pedido-header">
                                    <h4>Pedido #{pedido.id}</h4>
                                    <span className={`status ${pedido.status.toLowerCase()}`}>{pedido.status}</span>
                                </div>
                                <p><strong>Data:</strong> {new Date(pedido.createdAt).toLocaleDateString()}</p>
                                <p><strong>Total:</strong> R$ {pedido.total.toFixed(2).replace('.', ',')}</p>
                                <h5>Itens:</h5>
                                <ul>
                                    {pedido.items.map(item => (
                                        <li key={item.id}>
                                            {item.quantity}x {item.product.name}
                                        </li>
                                    ))}
                                </ul>
                                <button className="cancel-button">Cancelar Pedido</button>
                            </div>
                        ))
                    ) : (
                        <p>Você ainda não fez nenhum pedido.</p>
                    )}
                </div>
            </main>
        </div>
    );
}