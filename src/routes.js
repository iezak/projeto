import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Cadastro from "./paginas/Cadastro";
import Login from "./paginas/Login";
import Principal from "./paginas/Principal";

function AppRoutes() {
  return (
    <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/principal" element={<Principal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
