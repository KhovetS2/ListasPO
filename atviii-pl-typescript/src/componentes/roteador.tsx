import React, { useState } from "react";
import BarraNavegacao from "./barraNavegacao";
import ListaCliente from "./listaClientes";
import VisualizacaoCliente from "./visualizacaoCliente";
import Listagem from "./Listagem";
import Cadastros from "./Cadastros";

type State = {
    tela: string;
};

const Roteador: React.FC = () => {
    const [state, setState] = useState<State>({
        tela: 'Clientes',
    });

    const selecionarView = (novaTela: string, evento: React.MouseEvent) => {
        evento.preventDefault();
        console.log(novaTela);
        setState({
            ...state,
            tela: novaTela,
        });
    };

    const barraNavegacao = <BarraNavegacao seletorView={selecionarView} tema="#e3f2fd" botoes={['Clientes', 'Cadastros', 'Listagem']} />;

    return (
        <>
            {barraNavegacao}
            {state.tela === 'Clientes' && (
                <ListaCliente tema="#e3f2fd" seletorView={selecionarView} />
            )}
            {state.tela === 'Cliente' && (
                <VisualizacaoCliente />
            )}
            {state.tela === 'Cadastros' && (
                <Cadastros tema="#e3f2fd" />
            )}
            {state.tela === 'Listagem' && (
                <Listagem />
            )}
        </>
    );
};

export default Roteador;
