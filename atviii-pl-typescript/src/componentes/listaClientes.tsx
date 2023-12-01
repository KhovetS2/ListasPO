import React from "react";

type Props = {
    tema: string;
    seletorView: Function;
};

const ListaCliente: React.FC<Props> = ({ tema, seletorView }) => {
    return (
        <div className="container-fluid">
            <div className="list-group">
                <a href="#" className="list-group-item list-group-item-action" onClick={(e)=>{
                    seletorView("Cliente",e)
                }}>
                    Cliente Lorem
                </a>
                <a href="#" className="list-group-item list-group-item-action" onClick={(e)=>{
                    seletorView("Cliente",e)
                }}>
                    Cliente Lorem
                </a>
                <a href="#" className="list-group-item list-group-item-action" onClick={(e)=>{
                    seletorView("Cliente",e)
                }}>
                    Cliente Lorem
                </a>
                <a href="#" className="list-group-item list-group-item-action" onClick={(e)=>{
                    seletorView("Cliente",e)
                }}>
                    Cliente Lorem
                </a>
                <a href="#" className="list-group-item list-group-item-action" onClick={(e)=>{
                    seletorView("Cliente",e)
                }}>
                    Cliente Lorem
                </a>
                <a href="#" className="list-group-item list-group-item-action" onClick={(e)=>{
                    seletorView("Cliente",e)
                }}>
                    Cliente Lorem
                </a>
                
            </div>
        </div>
    );
};

export default ListaCliente;
