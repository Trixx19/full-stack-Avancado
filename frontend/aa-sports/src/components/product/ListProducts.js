import React, { useState, useEffect } from "react";
import ProductCard from "../card/ProductCard";
import "./ProductList.css";

export default function ProductList() {
    // Estado para armazenar os produtos buscados do backend
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    // useEffect para buscar os dados da API quando o componente for montado
    useEffect(() => {
        // A URL da sua API backend que criamos
        const apiUrl = 'http://localhost:3001/api/products';

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                setProducts(data); // Armazena os produtos no estado
            })
            .catch(error => {
                console.error("Erro ao buscar produtos do backend:", error);
            });
    }, []); // O array vazio [] significa que este efeito roda apenas uma vez

    // Lógica de paginação (continua a mesma)
    const totalPages = Math.ceil(products.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = products.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
    };

    return (
        <div className="product-section">
            <div className="product-grid">
                {currentItems.map((product) => (
                    // O product.image aqui deve corresponder ao nome do arquivo na sua pasta public/images/products
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            <div className="pagination">
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    ⬅ Anterior
                </button>

                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i}
                        className={currentPage === i + 1 ? "active" : ""}
                        onClick={() => handlePageChange(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}

                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                    Próximo ➡
                </button>
            </div>
        </div>
    );
}

