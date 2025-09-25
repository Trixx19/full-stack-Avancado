
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(null);
    const navigate = useNavigate();

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
        navigate('/');
    }, [navigate]);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser) {
            try {
                const userData = JSON.parse(storedUser);
                setToken(storedToken);
                setUser(userData);
                setIsAuthenticated(true);
            } catch (error) {
                console.error("Erro ao processar dados do localStorage, limpando sessão.", error);
                logout();
            }
        }
    }, [logout]);

    const login = (data) => {
        // Esta função agora aceita o objeto 'data' corretamente
        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('user', JSON.stringify(data.user));
        setToken(data.accessToken);
        setUser(data.user);
        setIsAuthenticated(true);

        // Redirecionamento após o login
        if (data.user.perfil === 'CLIENTE') {
            navigate(`/cliente/${data.user.id}`);
        } else if (data.user.perfil === 'VENDEDOR') {
            navigate(`/vendedor/${data.user.id}`);
        }
    };

    return (
        <AuthContext.Provider value={{ token, user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);