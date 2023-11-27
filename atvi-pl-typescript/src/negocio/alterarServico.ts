import Entrada from "../io/entrada";
import Servico from "../modelo/servico";
import Alterar from "./alterar";

export default class AlterarServico extends Alterar {
    private servicos : Array<Servico>
    private entrada: Entrada
    constructor(servicos : Array<Servico>) {
        super();
        this.servicos = servicos
        this.entrada = new Entrada()
    }
    public alterar(): void {
        let index = this.entrada.receberNumero("Digite o index do Serviço que você irá alterar:  ")
        let servico = this.servicos[index]
        let nome = this.entrada.receberTexto("Digite o novo nome do Serviço: ")
        let preco = this.entrada.receberNumero("Digite a nova preço do Serviço: ")
        servico.setNome = nome
        servico.setPreco = preco
        console.log("Alterações Realizadas com Sucesso!");
        
    }
}