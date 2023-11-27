import Entrada from "../io/entrada";
import Produto from "../modelo/produto";
import Alterar from "./alterar";

export default class AlterarProduto extends Alterar {
    private produtos : Array<Produto>
    private entrada: Entrada
    constructor(produtos : Array<Produto>) {
        super();
        this.produtos = produtos
        this.entrada = new Entrada()
    }
    public alterar(): void {
        let index = this.entrada.receberNumero("Digite o index do Produto que você irá alterar:  ")
        let produto = this.produtos[index]
        let nome = this.entrada.receberTexto("Digite o novo nome do Produto: ")
        let preco = this.entrada.receberNumero("Digite a nova preço do Produto: ")
        produto.setNome = nome
        produto.setPreco = preco
        console.log("Alterações Realizadas com Sucesso!");
        
    }
}