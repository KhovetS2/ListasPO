import ProdutoConsumo from "./produtoConsumo";
import ServicoConsumo from "./servicoConsumo";

export default class ConsumoRacaTipo {
    private produtoConsumo: Array<ProdutoConsumo>;
    private servicoConsumo: Array<ServicoConsumo>;
    private tipo: string;
    private raca: string;
    
    constructor(tipo: string, raca: string) {
        this.tipo=tipo
        this.raca=raca
        this.produtoConsumo=[]
        this.servicoConsumo=[]
    }
    public ordenarProdutoConsumoPorConsumoDecrescente() {
        this.produtoConsumo.sort((a, b) => b.getConsumo - a.getConsumo);
    }
    
    public get getProdutoConsumo(): Array<ProdutoConsumo> {
        return this.produtoConsumo;
    }
    public set setProdutoConsumo(value: Array<ProdutoConsumo>) {
        this.produtoConsumo = value;
    }
    public get getServicoConsumo(): Array<ServicoConsumo> {
        return this.servicoConsumo;
    }
    public set setServicoConsumo(value: Array<ServicoConsumo>) {
        this.servicoConsumo = value;
    }
    public get getTipo(): string {
        return this.tipo;
    }
    public set setTipo(value: string) {
        this.tipo = value;
    }
    public get getRaca(): string {
        return this.raca;
    }
    public set setRaca(value: string) {
        this.raca = value;
    }
}