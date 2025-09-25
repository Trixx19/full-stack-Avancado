import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault(); 
    setError(""); 

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
      
      console.log('Dados recebidos do backend:', data);
      
      login(data);
      
      // --- VERIFICAÇÃO PARA USAR 'perfil' ---
      if (data.user.perfil === 'VENDEDOR') {
        navigate(`/vendedor/${data.user.id}`);
      } else {
        navigate(`/cliente/${data.user.id}`);
      }
    } catch (err) {
      setError(err.message);
    }
  };

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
       {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '1rem' }}>{error}</p>}
    </div>
  );
}