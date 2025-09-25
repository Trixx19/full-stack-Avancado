import "./sideBar.css";
import { Link } from "react-router-dom";

export default function SideBar() {
    return (
        <nav className="sidebar">
            <h3>Menu</h3>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/user">Minha Conta</Link>
            <Link to="/">Home</Link>
        </nav>
    );
}