import React from "react";
import "./Footer.css";
import { FaInstagram, FaFacebookF, FaTwitter, FaYoutube, FaMobileAlt } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="aa-footer">
            <div className="footer-container">
                <div className="footer-col">
                    <h4>AA Sports Empresas</h4>
                    <p className="sub">Marketplace AA Sports</p>
                </div>

                <div className="footer-col">
                    <h4>Central de Relacionamento</h4>
                    <button className="footer-button">TIRE SUAS DÚVIDAS</button>
                    <h5>Central de Vendas</h5>
                    <p>(85) 3028-5355 e (85) 3070-6999</p>
                </div>

                <div className="footer-col">
                    <div className="socials">
                        <FaFacebookF />
                        <FaInstagram />
                        <FaTwitter />
                        <FaYoutube />
                    </div>
                    <div className="footer-app">
                        <FaMobileAlt size={22} />
                        <div>
                            <strong>App AA Sports</strong>
                            <p className="sub">Conheça as vantagens</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;