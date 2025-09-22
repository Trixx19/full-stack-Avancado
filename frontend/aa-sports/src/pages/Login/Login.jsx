import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [tipo, setTipo] = useState("cliente");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (tipo === "cliente") {
      navigate(`/cliente/123`); // Exemplo: ID do cliente
    } else {
      navigate(`/vendedor/999`); // Exemplo: ID do vendedor
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        
        {/* Coluna esquerda */}
        <div className="login-left">
          <h2 className="login-title">Já sou {tipo}</h2>

          {/* Escolha Cliente / Vendedor */}
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            className="login-input"
          >
            <option value="cliente">Cliente</option>
            <option value="vendedor">Vendedor</option>
          </select>

          <input
            type="text"
            placeholder="E-mail, CPF ou CNPJ"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Senha"
            className="login-input"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          {/* Link atualizado */}
          <Link to="/recuperar-senha" className="forgot-password">
            Esqueci minha senha
          </Link>

          <button onClick={handleLogin} className="btn-primary">
            ACESSAR CONTA
          </button>
          <button className="btn-outline">ENTRAR SEM SENHA</button>
        </div>

        {/* Coluna direita */}
        <div className="login-right">
          <h2 className="login-title">Criar conta</h2>

          <input
            type="email"
            placeholder="Informe seu e-mail"
            className="login-input"
          />

          <button className="btn-primary">PROSSEGUIR</button>
        </div>
      </div>
    </div>
  );
}
