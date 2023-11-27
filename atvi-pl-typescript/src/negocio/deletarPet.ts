import Entrada from "../io/entrada"
import Deletar from "./deletar"
import Cliente from "../modelo/cliente"

export default class DeletarPet extends Deletar {
    private entrada: Entrada
    private cliente: Cliente
    constructor(cliente: Cliente) {
        super()
        this.cliente = cliente
        this.entrada = new Entrada()
    }
    public deletar(): void {
        let index = this.entrada.receberNumero(`Por favor informe o index do produto a ser excluído: `)
        let produtoRemover = this.cliente.getPets[index]
        let newPets= this.cliente.getPets.filter(produto=> produto!==produtoRemover)
        this.cliente.setPets=newPets
        console.log(`\n Pet Excluído :)\n`);
    }
}