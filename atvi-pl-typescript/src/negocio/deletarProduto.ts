import Entrada from "../io/entrada"
import Deletar from "./deletar"
import Empresa from "../modelo/empresa"

export default class DeletarProduto extends Deletar {
    private entrada: Entrada
    private empresa: Empresa
    constructor(empresa: Empresa) {
        super()
        this.empresa = empresa
        this.entrada = new Entrada()
    }
    public deletar(): void {
        let index = this.entrada.receberNumero(`Por favor informe o index do produto a ser excluído: `)
        let produtoRemover = this.empresa.getProdutos[index]
        let newProdutos= this.empresa.getProdutos.filter(produto=> produto!==produtoRemover)
        this.empresa.setProdutos=newProdutos
        console.log(`\nServiço Excluído :)\n`);
    }
}