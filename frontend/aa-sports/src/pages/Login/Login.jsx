import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); // Obtém a função de login do nosso contexto

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Estado para mensagens de erro

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // 1. Apontar para a porta correta do backend (4000)
      const response = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao tentar fazer login.');
      }

      // 2. Usar o AuthContext para salvar o usuário e o token
      login(data.user, data.accessToken);
      
      // 3. Redirecionar com base no 'perfil' (VENDEDOR ou CLIENTE)
      if (data.user.perfil === 'VENDEDOR') {
        navigate(`/vendedor/${data.user.id}`);
      } else {
        navigate(`/cliente/${data.user.id}`);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        
        {/* Coluna esquerda - Login */}
        <div className="login-left">
          <h2 className="login-title">Acessar minha conta</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="E-mail"
              className="login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Senha"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Link to="/recuperar-senha" className="forgot-password">
              Esqueci minha senha
            </Link>
            <button type="submit" className="btn-primary">
              ACESSAR CONTA
            </button>
          </form>
        </div>

        {/* Coluna direita - Link para Criar Conta */}
        <div className="login-right">
          <h2 className="login-title">Ainda não sou cliente</h2>
          <p>Crie sua conta para uma experiência de compra completa e personalizada.</p>
          <Link to="/register" className="btn-primary-link">
             CRIAR CONTA
          </Link>
        </div>
      </div>
       {/* Exibe a mensagem de erro, se houver */}
       {error && <p className="error-message">{error}</p>}
    </div>
  );
}
