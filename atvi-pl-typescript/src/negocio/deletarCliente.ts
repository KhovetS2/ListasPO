import Entrada from "../io/entrada"
import Deletar from "./deletar"
import Empresa from "../modelo/empresa"

export default class DeletarCliente extends Deletar {
    private entrada: Entrada
    private empresa: Empresa
    constructor(empresa: Empresa) {
        super()
        this.empresa = empresa
        this.entrada = new Entrada()
    }
    public deletar(): void {
        let index = this.entrada.receberNumero(`Por favor informe o index do cliente a ser excluído: `)
        let clienteRemover = this.empresa.getClientes[index]
        let newClientes= this.empresa.getClientes.filter(cliente=> cliente!==clienteRemover)
        this.empresa.setClientes=newClientes
        console.log(`\nCliente Excluído :)\n`);
    }
}