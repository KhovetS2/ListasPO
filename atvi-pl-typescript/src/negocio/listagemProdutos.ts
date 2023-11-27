import Produto from "../modelo/produto";
import Listagem from "./listagem";

export default class ListagemProdutos extends Listagem {
    private produtos: Array<Produto>
    constructor(produtos: Array<Produto>) {
        super()
        this.produtos = produtos
    }
    
    public set setProdutos(produtos: Array<Produto>) {
        this.produtos = produtos;
    }
    

    public listar(): void {
        console.log(`\nLista de todos os produtos:`);
        this.produtos.forEach(produto => {
            console.log(`Nome do Produto: ` + produto.getNome);
            console.log(`Valor do Produto: ` + produto.getPreco);
            console.log(`--------------------------------------`);
        });
        console.log(`\n`);
    }
    public listarComIndex(): void {
        console.log(`\nLista de todos os produtos com index:`);
        for (let index = 0; index < this.produtos.length; index++) {
            const produto = this.produtos[index];
            console.log(`Index: ${index}`);
            console.log(`Nome do Produto: ` + produto.getNome);
            console.log(`Valor do Produto: ` + produto.getPreco);
            console.log(`--------------------------------------`);
        }
        console.log(`\n`);
    }
}