import "./UserPage.css";
import UserIcon from "../../components/UserIcon/UserIcon";
import Menu from "../../components/Menu/Menu";

export default function UserPage() {
    return (
        <div className="user-page">
        <aside>
            <UserIcon />
            <Menu />
        </aside>

        <main className="user-content">
            <h2>Painel do Usuário</h2>
            
        </main>
        </div>
    );
}
