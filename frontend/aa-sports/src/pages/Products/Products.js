// Em frontend/aa-sports/src/pages/Products/Products.js (VERSÃO FINAL E CORRIGIDA)

import React, { useState, useEffect } from 'react';
import ProductCard from '../../components/card/ProductCard';
import './Products.css';

const Products = () => {
    // 1. Criamos os estados: um para a lista de produtos, um para erros e um para o loading.
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 2. Usamos o useEffect para buscar os dados da API quando a página carrega.
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/products');
                
                if (!response.ok) {
                    throw new Error('Não foi possível carregar os produtos.');
                }
                
                const data = await response.json();
                setProducts(data); // 3. Salvamos os produtos no nosso estado.
            } catch (err) {
                setError(err.message);
                console.error("Erro ao buscar produtos:", err);
            } finally {
                setLoading(false); // 4. Finalizamos o carregamento (com sucesso ou erro).
            }
        };

        fetchProducts();
    }, []); // O array vazio [] garante que a busca aconteça apenas uma vez.


    // Renderização com base nos estados
    if (loading) {
        return <div className="products-container"><p>Carregando produtos...</p></div>;
    }

    if (error) {
        return <div className="products-container"><p>Erro: {error}</p></div>;
    }

    return (
        <div className="products-container">
            <h1 className="products-title">Nossos Produtos</h1>
            <div className="product-grid">
                {products.length > 0 ? (
                    products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))
                ) : (
                    <p>Nenhum produto encontrado.</p>
                )}
            </div>
        </div>
    );
};

export default Products;