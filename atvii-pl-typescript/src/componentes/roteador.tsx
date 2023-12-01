import { Component } from "react";
import BarraNavegacao from "./barraNavegacao";
import ListaCliente from "./listaClientes";
import FormularioCadastroCliente from "./formularioCadastroCliente";
import Cliente from "../models/cliente";
import CPF from "../models/cpf";
import Pet from "../models/pet";
import RG from "../models/rg";
import Telefone from "../models/telefone";

type state = {
    tela: string,
    listaCliente: Array<Cliente>
}

export default class Roteador extends Component<{}, state>{
    constructor(props: {} | Readonly<{}>) {
        super(props)
        let cliente = new Cliente('Isaque','Khovet',new CPF('12312312312', new Date()))
        cliente.getRgs.push(new RG('123', new Date()))
        cliente.getTelefones.push(new Telefone('123', '231241'))
        cliente.getPets.push(new Pet('Jubileu', 'Ave', 'Masculino', 'Pombo'))
        cliente.getPets.push(new Pet('Carlão', 'Cão', 'Masculino', 'Bodercoler'))
        this.state = {
            tela: 'Clientes',
            listaCliente: new Array<Cliente>(cliente)
        }
        this.selecionarView = this.selecionarView.bind(this)
    }

    selecionarView(novaTela: string, evento: Event) {
        evento.preventDefault()
        console.log(novaTela);
        this.setState({
            tela: novaTela
        })
    }

    render() {
        let barraNavegacao = <BarraNavegacao seletorView={this.selecionarView} tema="#e3f2fd" botoes={['Clientes', 'Cadastros']} />
        if (this.state.tela === 'Clientes') {
            return (
                <>
                    {barraNavegacao}
                    <ListaCliente listaCliente={this.state.listaCliente} tema="#e3f2fd" />
                </>
            )
        } else {
            return (
                <>
                    {barraNavegacao}
                    <FormularioCadastroCliente listaCliente={this.state.listaCliente} tema="#e3f2fd" />
                </>
            )
        }
    }
}