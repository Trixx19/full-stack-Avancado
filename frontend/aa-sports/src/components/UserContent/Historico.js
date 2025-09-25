import { useState, useEffect } from "react";
import "./Historico.css";

export default function Historico() {
    const [historico, setHistorico] = useState([]);

    // Simula uma requisição de histórico
    useEffect(() => {
        const fakeHistorico = [
            {
                id: 201,
                data: "2025-08-10",
                total: 329.90,
                produtos: ["Camisa DryFit", "Tênis Run 500"]
            },
            {
                id: 202,
                data: "2025-08-25",
                total: 199.50,
                produtos: ["Bola de Futebol"]
            },
            {
                id: 203,
                data: "2025-09-05",
                total: 549.99,
                produtos: ["Kit Suplemento Whey", "Garrafa 1L"]
            }
        ];
        setHistorico(fakeHistorico);
    }, []);

    return (
        <div className="historico-pedido">
            <h2>Histórico de Pedidos</h2>

            {historico.length === 0 ? (
                <p>Você ainda não possui pedidos registrados.</p>
            ) : (
                <ul className="historico-lista">
                    {historico.map((pedido) => (
                        <li key={pedido.id} className="historico-item">
                            <div className="historico-header">
                                <span className="historico-id">Pedido #{pedido.id}</span>
                                <span className="historico-data">{pedido.data}</span>
                            </div>

                            <ul className="historico-produtos">
                                {pedido.produtos.map((produto, i) => (
                                    <li key={i}>{produto}</li>
                                ))}
                            </ul>

                            <div className="historico-total">
                                Total: <strong>R${pedido.total.toFixed(2)}</strong>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
