import Cliente from "../modelo/cliente";
import Listagem from "./listagem";

export default class ListagemClientes extends Listagem {
    private clientes: Array<Cliente>
    constructor(clientes: Array<Cliente>) {
        super()
        this.clientes = clientes
    }
    
    public set setClientes(clientes: Array<Cliente>) {
        this.clientes = clientes;
    }
    

    public listar(): void {
        console.log(`\nLista de todos os clientes:`);
        this.clientes.forEach(cliente => {
            console.log(`Nome: ` + cliente.nome);
            console.log(`Nome social: ` + cliente.nomeSocial);
            console.log(`CPF: ` + cliente.getCpf.getValor);
            cliente.getRgs.forEach(rg => console.log(`RG: `+rg.getValor))
            cliente.getTelefones.forEach(telefone => console.log(`Telefone: (${telefone.getDdd}) ${telefone.getNumero}`))
            console.log(`--------------------------------------`);
        });
        console.log(`\n`);
    }
    public listarComIndex(): void {
        console.log(`\nLista de todos os clientes com index:`);
        for (let index = 0; index < this.clientes.length; index++) {
            const cliente = this.clientes[index];
            console.log(`Index: ${index}`);
            console.log(`Nome: ` + cliente.nome);
            console.log(`Nome social: ` + cliente.nomeSocial);
            console.log(`CPF: ` + cliente.getCpf.getValor);
            cliente.getRgs.forEach(rg => console.log(`RG: `+rg.getValor))
            cliente.getTelefones.forEach(telefone => console.log(`Telefone: (${telefone.getDdd}) ${telefone.getNumero}`))
            console.log(`--------------------------------------`);
        }
        console.log(`\n`);
    }
}