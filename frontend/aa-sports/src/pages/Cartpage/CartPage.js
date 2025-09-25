// Em frontend/aa-sports/src/pages/Cartpage/CartPage.js (VERSÃO FINAL E INTEGRADA)

import React from 'react';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext'; // Importar AuthContext
import { Link, useNavigate } from 'react-router-dom'; // Importar useNavigate
import './CartPage.css';

// Ícone do carrinho vazio
const CartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="empty-cart-icon">
        <circle cx="9" cy="21" r="1"></circle>
        <circle cx="20" cy="21"r="1"></circle>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
    </svg>
);

function CartPage() {
    // Usar todos os hooks necessários
    const { cartItems, removeFromCart, clearCart } = useCart();
    const { isAuthenticated, user } = useAuth();
    const navigate = useNavigate();

    // Agrupa os itens para mostrar a quantidade (essencial para o pedido)
    const groupedCart = cartItems.reduce((acc, item) => {
        const existingItem = acc.find(i => i.id === item.id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            acc.push({ ...item, quantity: 1 });
        }
        return acc;
    }, []);

    const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

    // Nova função para finalizar a compra de verdade
    const handleFinalizarCompra = async () => {
        if (!isAuthenticated || user.perfil !== 'CLIENTE') {
            alert('Você precisa estar logado como cliente para finalizar a compra!');
            navigate('/login');
            return;
        }

        const orderItems = groupedCart.map(item => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price
        }));

        const token = localStorage.getItem('token');

        try {
            const response = await fetch('http://localhost:4000/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    items: orderItems,
                    total: totalPrice
                })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Não foi possível processar seu pedido.");
            }

            alert("Compra finalizada com sucesso!");
            clearCart();
            navigate(`/cliente/${user.id}`);

        } catch (error) {
            console.error("Erro ao finalizar a compra:", error);
            alert(`Erro: ${error.message}`);
        }
    };

    return (
        <div className="cart-page">
            {cartItems.length === 0 ? (
                <div className="empty-cart-container">
                    <CartIcon />
                    <h2 className="empty-cart-title">Seu carrinho está vazio</h2>
                    <p className="empty-cart-subtitle">Que tal explorar nossos produtos em destaque?</p>
                    <Link to="/produtos" className="explore-button">
                        Explorar produtos
                    </Link>
                </div>
            ) : (
                <>
                    <h2 className="cart-title">Meu Carrinho</h2>
                    <div className="cart-container">
                        <div className="cart-items-list">
                            {/* Mapear sobre o carrinho agrupado */}
                            {groupedCart.map((item) => (
                                <div key={item.id} className="cart-item">
                                    <img src={`/images/products/${item.image}`} alt={item.name} />
                                    <div className="item-details">
                                        <h3>{item.name}</h3>
                                        {/* Exibir a quantidade */}
                                        <p className="item-quantity">Quantidade: {item.quantity}</p>
                                        <p className="item-price">R$ {item.price.toFixed(2).replace('.', ',')}</p>
                                    </div>
                                    {/* Ajuste no botão remover para usar o ID do produto */}
                                    <button onClick={() => removeFromCart(item.id)} className="remove-button">
                                        Remover
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="cart-summary">
                            <h3>Resumo do Pedido</h3>
                            <div className="summary-total">
                                <span>Total</span>
                                <strong>R$ {totalPrice.toFixed(2).replace('.', ',')}</strong>
                            </div>
                            {/* Botão agora chama a nossa função de finalizar a compra */}
                            <button onClick={handleFinalizarCompra} className="checkout-button">
                                Finalizar Compra
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default CartPage;