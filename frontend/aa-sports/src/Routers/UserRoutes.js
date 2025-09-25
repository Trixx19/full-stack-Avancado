import React from 'react';
import { Routes, Route } from 'react-router-dom';

import PainelUsuarioLayout from '../pages/User/PainelUsuarioLayout'; 

import StatusPedido from '../components/UserContent/StatusPedido';
import Historico from '../components/UserContent/Historico';

export default function UserRoutes() {
    return (
        <Routes>
        <Route element={<PainelUsuarioLayout />}>
            <Route index element={<StatusPedido />} />
            <Route path="status" element={<StatusPedido />} />
            <Route path="historico" element={<Historico />} />
            {/* Adicione a rota de endereços quando tiver o componente */}
            {/* <Route path="enderecos" element={<Enderecos />} /> */}
        </Route>
        </Routes>
    );
}