import React, { useState } from "react";
import { products } from "../../data/Products"; // <- seu array manual
import ProductCard from "../card/ProductCard";
import "./ProductList.css";

export default function ProductList() {
    const itemsPerPage = 20;
    const [currentPage, setCurrentPage] = useState(1);

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
