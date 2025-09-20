import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Suplementos.css';

function Suplementos() {
  const navigate = useNavigate();

  const categorias = [
    { nome: 'Proteínas', imagem: '/img/proteina.webp', rota: '/suplementos/proteinas' },
    { nome: 'Termogênicos', imagem: '/img/termogenico.webp', rota: '/suplementos/termogenicos' },
    { nome: 'Creatina', imagem: '/img/creatina.webp', rota: '/suplementos/creatina' },
    { nome: 'Pré Treino', imagem: '/img/pretreino.webp', rota: '/suplementos/pretreino' },
    { nome: 'Multivitaminas', imagem: '/img/multivitaminico.webp', rota: '/suplementos/multivitaminas' },
    { nome: 'Hipercalóricos', imagem: '/img/hipercaloricos.webp', rota: '/suplementos/hipercaloricos' },
    { nome: 'Veganos', imagem: '/img/produto-veganos.webp', rota: '/suplementos/veganos' },
    { nome: 'Barras Proteicas', imagem: '/img/barraproteicas.webp', rota: '/suplementos/barras-proteicas' }
  ];

  return (
    <div className="pagina-suplementos">
      {/* SLIDER PROMOCIONAL */}
      <div className="slider-suplementos">
        <img src="/img/slider1.webp" alt="Promoção suplementos" />
      </div>

      {/* CATEGORIAS EM BOLINHAS */}
      <h2 className="titulo-categorias">Nossas Indicações de Suplementos</h2>
      <div className="categorias-bolinhas">
        {categorias.map((cat, index) => (
          <div key={index} className="categoria" onClick={() => navigate(cat.rota)}>
            <div className="bolinha">
              <img src={cat.imagem} alt={cat.nome} />
            </div>
            <span>{cat.nome}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Suplementos;
