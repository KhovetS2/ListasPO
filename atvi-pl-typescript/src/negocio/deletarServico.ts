import Entrada from "../io/entrada"
import Deletar from "./deletar"
import Empresa from "../modelo/empresa"

export default class DeletarServico extends Deletar {
    private entrada: Entrada
    private empresa: Empresa
    constructor(empresa: Empresa) {
        super()
        this.empresa = empresa
        this.entrada = new Entrada()
    }
    public deletar(): void {
        let index = this.entrada.receberNumero(`Por favor informe o index do servico a ser excluído: `)
        let servicoRemover = this.empresa.getServicos[index]
        let newServicos= this.empresa.getServicos.filter(servico=> servico!==servicoRemover)
        this.empresa.setServicos=newServicos
        console.log(`\nServiço Excluído :)\n`);
    }
}