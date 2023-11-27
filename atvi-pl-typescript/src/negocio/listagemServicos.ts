import Servico from "../modelo/servico";
import Listagem from "./listagem";

export default class ListagemServicos extends Listagem {
    private servicos: Array<Servico>
    constructor(servicos: Array<Servico>) {
        super()
        this.servicos = servicos
    }
    
    public set setServicos(servicos: Array<Servico>) {
        this.servicos = servicos;
    }
    

    public listar(): void {
        console.log(`\nLista de todos os servicos:`);
        this.servicos.forEach(produto => {
            console.log(`Nome do Serviço: ` + produto.getNome);
            console.log(`Valor do Serviço: ` + produto.getPreco);
            console.log(`--------------------------------------`);
        });
        console.log(`\n`);
    }
    public listarComIndex(): void {
        console.log(`\nLista de todos os servicos com index:`);
        for (let index = 0; index < this.servicos.length; index++) {
            const produto = this.servicos[index];
            console.log(`Index: ${index}`);
            console.log(`Nome do Serviço: ` + produto.getNome);
            console.log(`Valor do Serviço: ` + produto.getPreco);
            console.log(`--------------------------------------`);
        }
        console.log(`\n`);
    }
}