import "./Menu.css";
import { Link } from "react-router-dom";

export default function Menu() {
    return (
        <ul className="menu">
            <li><Link to="/status">Status do Pedido</Link></li>
            <li><Link to="/historico">Histórico</Link></li>
            <li><Link to="/enderecos">Endereços</Link></li>
            <li><Link to="/logout">Logout</Link></li>
        </ul>
    );
}
