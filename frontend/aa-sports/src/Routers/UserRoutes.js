import { Route } from "react-router-dom";
import UserLayout from "./UserLayout";
import Status from "./pages/Status";
import ClientePage from "./pages/ClientePage";
import Enderecos from "./pages/Enderecos";

export const userRoutes = (
    

    <Route path="/user" element={<UserLayout />}>
        <Route index element={<PainelUsuario />} />
        <Route path="status" element={<Status />} />
        <Route path="historico" element={<ClientePage />} />
        <Route path="enderecos" element={<Enderecos />} />
    </Route>
);
