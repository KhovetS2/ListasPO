/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component } from "react";
import Cliente from "../models/cliente";

type props = {
    tema: string
    listaCliente: Array<Cliente>
}

export default class ListaCliente extends Component<props>{
    render() {
        let tema = this.props.tema
        
        return (
            <div className="container-fluid">
                <div className="list-group">
                    {this.props.listaCliente.map((cliente: Cliente)=>{
                        return(<a href="#" key={cliente.getCpf.getValor} className="list-group-item list-group-item-action">Cliente {cliente.nome}</a>)
                    })}
                    
                </div>
            </div>
        )
    }
}