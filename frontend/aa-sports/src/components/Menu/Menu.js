// src/components/Menu/Menu.js

import "./Menu.css";
// Vamos usar NavLink para poder estilizar o link ativo, é uma melhoria simples.
import { NavLink } from "react-router-dom";

export default function Menu() {
    return (
        <ul className="menu">
            {/* 👇 CADA 'to' AGORA COMEÇA COM /user/ */}
            <li>
                <NavLink to="/user/status">Status do Pedido</NavLink>
            </li>
            <li>
                <NavLink to="/user/historico">Histórico</NavLink>
            </li>
            <li>
                <NavLink to="/user/enderecos">Endereços</NavLink>
            </li>
            <li>
                <NavLink to="/user/logout">Logout</NavLink>
            </li>
        </ul>
    );
}