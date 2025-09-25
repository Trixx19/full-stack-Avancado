

import React from 'react';
import { Outlet } from 'react-router-dom';

import "./UserPage.css";
import UserIcon from "../../components/UserIcon/UserIcon";
import Menu from "../../components/Menu/Menu"; // Este é o seu MenuLateral

export default function PainelUsuarioLayout() { 
    return (
        <div className="user-page">
            <aside>
                <UserIcon />
                <Menu />
            </aside>

            <main className="user-content">
                {/* Agora este é apenas um espaço vazio que será preenchido pelo roteador. */}
                <Outlet />
            </main>
        </div>
    );
}