import Produto from "./produto";

export default class ProdutoConsumo {
    private produto: Produto;
    
    private consumo: number
    constructor(produto: Produto) {
        this.produto=produto
        this.consumo=0
    }
    /**
     * adicionarConsumo
     */
    public adicionarConsumo(valorConsumido: number) {
        this.consumo+=valorConsumido
    }
    public get getProduto(): Produto {
        return this.produto;
    }
    public get getConsumo(): number {
        return this.consumo;
    }
    public set setProduto(value: Produto) {
        this.produto = value;
    }
}