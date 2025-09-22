import React, { createContext, useState, useContext, useEffect } from 'react';

// Ele vai armazenar as informações do usuário logado e as funções de login/logout.
const AuthContext = createContext(null);

//Cria o Provedor (AuthProvider)
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Tenta encontrar dados de usuário no localStorage do navegador.
    // Isso serve para manter o usuário logado mesmo que ele feche e abra o navegador.
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Função para fazer login
  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  // Função para fazer logout
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  // Objeto que será compartilhado com todos os componentes
  const value = {
    user, 
    isAuthenticated: !!user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// 3. Hook customizado (useAuth)
// É uma forma mais fácil para os outros componentes acessarem os dados do contexto.
export function useAuth() {
  return useContext(AuthContext);
}

