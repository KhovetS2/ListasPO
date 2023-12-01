import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

type Props = {
    tema: string;
    botoes: string[];
    seletorView: Function;
};

const BarraNavegacao: React.FC<Props> = ({ tema, botoes, seletorView }) => {
    const gerarListaBotoes = () => {
        if (botoes.length <= 0) {
            return <></>;
        } else {
            const lista = botoes.map((valor) => (
                <li key={valor} className="nav-item">
                    <a className="nav-link" href="#" onClick={(e) => seletorView(valor, e)}>
                        {valor}
                    </a>
                </li>
            ));
            return lista;
        }
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg" data-bs-theme="light" style={{ backgroundColor: tema, marginBottom: 10 }}>
                <div className="container-fluid">
                    <span className="navbar-brand mb-0 h1">PetLovers</span>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">{gerarListaBotoes()}</ul>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default BarraNavegacao;