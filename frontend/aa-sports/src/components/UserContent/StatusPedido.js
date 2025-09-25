import { useState, useEffect } from "react";
import "./StatusPedido.css";
export default function StatusPedido() {
    const [pedidos, setPedidos] = useState([]);

    // Simula busca em API
    useEffect(() => {
        const fakePedidos = [
            { id: 101, data: "2025-09-15", status: "Enviado", total: 249.90 },
            { id: 102, data: "2025-09-18", status: "Em preparação", total: 129.50 },
            { id: 103, data: "2025-09-21", status: "Entregue", total: 89.99 }
        ];
        setPedidos(fakePedidos);
    }, []);

    return (
        <div className="status-pedido">
            <h2>Status do Pedido</h2>

            {pedidos.length === 0 ? (
                <p>Nenhum pedido encontrado.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Data</th>
                            <th>Status</th>
                            <th>Total (R$)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pedidos.map((p) => (
                            <tr key={p.id}>
                                <td>{p.id}</td>
                                <td>{p.data}</td>
                                <td>{p.status}</td>
                                <td>{p.total.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
