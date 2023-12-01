import { Component } from "react";
import Cliente from "../models/cliente";
import { Button, FormLabel, Input, Stack } from "@chakra-ui/react";

type props = {
    tema: string
    listaCliente: Array<Cliente>
}
type state = {
    nome: string
    nomeSocial: string
    cpf: string
    dataEmissaoCpf: string
    rg: string
    dataEmissaoRG: string
    ddd: string
    numero: string

}
export default class FormularioCadastroCliente extends Component<props,state> {
    /**
     * cadastrarCliente
     */
    constructor(props: props){
        super(props)
    }
    public cadastrarCliente() {
        
    }
    render() {
        let tema = this.props.tema
        return (
            <div className="container-fluid">
                <form>
                    <div className="input-group mb-3">
                        <Input type="text" className="form-control" placeholder="Nome" aria-label="Nome" aria-describedby="basic-addon1" />
                    </div>
                    <div className="input-group mb-3">
                        <Input type="text" className="form-control" placeholder="Nome social" aria-label="Nome social" aria-describedby="basic-addon1" />
                    </div>
                    <div className="input-group mb-3">
                        <Input type="text" className="form-control" placeholder="CPF" aria-label="CPF" aria-describedby="basic-addon1" />
                    </div>
                    <FormLabel>Data de Emissão CPF</FormLabel>
                    <div className="input-group mb-3">
                        <Input type="date" className="form-control" placeholder="Data de Emissão" aria-label="Data de Emissão" aria-describedby="basic-addon1" />
                    </div>
                    <div className="input-group mb-3">
                        <Input type="text" className="form-control" placeholder="RG" aria-label="RG" aria-describedby="basic-addon1" />
                    </div>
                    <FormLabel>Data de Emissão RG</FormLabel>
                    <div className="input-group mb-3">
                        <Input type="date" className="form-control" placeholder="Data de Emissão" aria-label="Data de Emissão" aria-describedby="basic-addon1" />
                    </div>
                    <div className="input-group mb-3" >
                        <Stack direction={'row'}>
                            <Input type="tel" className="form-control" placeholder="DDD" aria-label="DDD" aria-describedby="basic-addon1" width={'20%'} />
                            <Input type="tel" className="form-control" placeholder="Número" aria-label="Número" aria-describedby="basic-addon1"  />
                        </Stack>
                    </div>
                    <div className="input-group mb-3">
                        <Button className="btn btn-outline-secondary" type="button" style={{ background: tema }}>Cadastrar</Button>
                    </div>
                </form>
            </div>
        )
    }
}