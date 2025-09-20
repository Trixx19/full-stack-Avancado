import React from "react";
import { products } from "../../data/Products";
import ProductCard from "../card/ProductCard";
import "./FeaturedProducts.css";

function getRandomProducts(products, count = 8) {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

    export default function FeaturedProducts() {
    const randomProducts = getRandomProducts(products, 12);

    return (
        <div className="product-grid">
            {randomProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}
