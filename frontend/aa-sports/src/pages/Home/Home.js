import React from "react";
import "./Home.css";
import bannerFooter from "../../assets/icons/banner/banner-footer.webp"
import banner from "../../assets/icons/banner/1367_desk_full_campanha_payday.gif";
import ProductCarrosel from "../../components/carrosel/Carrosel";
import FeaturedProducts from "../../components/featured/FeaturedProducts";

const Home = () => {
  return (
    <div className="home-page">
      <img src={banner} alt="Banner de promoção" className="home-banner" />
      
      <div className="container">
        <h2 className="section-title">Produtos em destaque</h2>
        <ProductCarrosel />
        <FeaturedProducts /> {/* Substituiu o ListProducts */}
      </div>

      <div className="footer-banner">
        <img src={bannerFooter} alt="Banner Promoção" />
      </div>
    </div>
  );
};

export default Home;