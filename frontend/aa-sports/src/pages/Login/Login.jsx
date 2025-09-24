import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); // Obtém a função de login do nosso contexto

  // Estados para os campos de login
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Estados para os campos de registro
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");

  // Estado para exibir mensagens de erro
  const [error, setError] = useState("");

  // Função para lidar com o envio do formulário de LOGIN
  const handleLogin = async (e) => {
    e.preventDefault(); // Impede o recarregamento da página
    setError(""); // Limpa erros anteriores

    try {
      const response = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao tentar fazer login.');
      }

      // Se o login for bem-sucedido, salva o usuário e o token
      login(data.user, data.accessToken); 
      
      // Redireciona com base no perfil do usuário retornado pela API
      if (data.user.perfil === 'VENDEDOR') {
        navigate(`/vendedor/${data.user.id}`);
      } else {
        navigate(`/cliente/${data.user.id}`);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // Função para lidar com o envio do formulário de REGISTRO
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch('http://localhost:4000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: registerName, email: registerEmail, password: registerPassword }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Erro ao criar conta.');
      }
      
      alert('Conta criada com sucesso! Por favor, faça o login.');
      // Limpa os campos do formulário de registro
      setRegisterName('');
      setRegisterEmail('');
      setRegisterPassword('');

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        
        {/* Coluna esquerda - Login */}
        <div className="login-left">
          <h2 className="login-title">Já sou cliente</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="E-mail"
              className="login-input"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Senha"
              className="login-input"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
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

        {/* Coluna direita - Criar Conta */}
        <div className="login-right">
          <h2 className="login-title">Criar conta</h2>
          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Nome completo"
              className="login-input"
              value={registerName}
              onChange={(e) => setRegisterName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Informe seu e-mail"
              className="login-input"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Crie uma senha"
              className="login-input"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
              required
            />
            <button type="submit" className="btn-primary">CRIAR CONTA</button>
          </form>
        </div>
      </div>
       {/* Exibe a mensagem de erro, se houver */}
       {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '1rem' }}>{error}</p>}
    </div>
  );
}