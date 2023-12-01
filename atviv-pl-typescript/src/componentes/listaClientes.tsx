import React, { useEffect, useState } from "react";
import Cliente from "../models/Cliente";
import { getAllClientes } from "../services/cliente";

type Props = {
    tema: string;
    clientView: Function;
};

const ListaCliente: React.FC<Props> = ({ tema, clientView }) => {

    const [listaClient, setListaClient] = useState<Array<Cliente>>()
    useEffect(() => {

        (async () => {
            const listaCliente: Array<Cliente> = await getAllClientes()
            
            setListaClient(listaCliente)
        })()

    }, [])

    return (
        <div className="container-fluid">
            <div className="list-group">
                {listaClient !== undefined && listaClient.map((cliente) => {
                    return (
                        <a href="#" className="list-group-item list-group-item-action" onClick={(e) => {
                            clientView("Cliente", e, cliente)
                        }}>
                            {cliente.nome}
                        </a>
                    )
                })}

            </div>
        </div>
    );
};

export default ListaCliente;
