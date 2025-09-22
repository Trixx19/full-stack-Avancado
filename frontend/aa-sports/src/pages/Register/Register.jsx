import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Register.css';

export default function Register() {
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:4000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao criar conta.');
      }

      setSuccess('Conta criada com sucesso! Você será redirecionado para o login.');
      setTimeout(() => {
        navigate('/login');
      }, 2000); // Redireciona após 2 segundos

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2 className="register-title">Criar Conta</h2>
        <p className="register-subtitle">Preencha os campos abaixo para criar sua conta na AA Sports.</p>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Nome completo"
            className="register-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Seu melhor e-mail"
            className="register-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Crie uma senha"
            className="register-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          <button type="submit" className="btn-primary">CRIAR CONTA</button>
        </form>
        <div className="login-link">
          <p>Já tem uma conta? <Link to="/login">Faça o login</Link></p>
        </div>
      </div>
    </div>
  );
}
