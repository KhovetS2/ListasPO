import React, { useState } from "react";
import BarraNavegacao from "./barraNavegacao";
import ListaCliente from "./listaClientes";
import VisualizacaoCliente from "./visualizacaoCliente";
import Listagem from "./Listagem";
import Cadastros from "./Cadastros";
import Cliente from "../models/Cliente";
import { getCliente } from "../services/cliente";

type State = {
    tela: string;
    cliente: Cliente | undefined
};

const Roteador: React.FC = () => {
    const [state, setState] = useState<State>({
        tela: 'Clientes',
        cliente: undefined
    });

    const selecionarView = (novaTela: string, evento: React.MouseEvent) => {
        evento.preventDefault();
        console.log(novaTela);
        setState({
            ...state,
            tela: novaTela,
        });
    };
    const clientView = (novaTela: string, evento: React.MouseEvent, cliente: Cliente) => {
        evento.preventDefault();
        console.log(novaTela);
        setState({
            ...state,
            tela: novaTela,
            cliente: cliente
        });
    };

    const atualizarCliente = async (id: number)=>{
        setState({
            ...state,
            cliente: await getCliente(id)
        })
    }

    const barraNavegacao = <BarraNavegacao seletorView={selecionarView} tema="#e3f2fd" botoes={['Clientes', 'Cadastros', 'Listagem']} />;

    return (
        <>
            {barraNavegacao}
            {state.tela === 'Clientes' && (
                <ListaCliente tema="#e3f2fd" clientView={clientView} />
            )}
            {state.tela === 'Cliente' && (
                <VisualizacaoCliente cliente={state.cliente} atualizarCliente={atualizarCliente} selectView={selecionarView} />
            )}
            {state.tela === 'Cadastros' && (
                <Cadastros selectView={selecionarView} tema="#e3f2fd" />
            )}
            {state.tela === 'Listagem' && (
                <Listagem />
            )}
        </>
    );
};

export default Roteador;
