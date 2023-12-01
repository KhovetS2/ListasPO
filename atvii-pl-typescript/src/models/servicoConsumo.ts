import Servico from "./servico";

export default class ServicoConsumo {
    private servico: Servico;
    public get getServico(): Servico {
        return this.servico;
    }
    public set setServico(value: Servico) {
        this.servico = value;
    }
    private consumo: number
    constructor(servico: Servico) {
        this.servico=servico
        this.consumo=0
    }
    /**
     * adicionarConsumo
     */
    
    public get getConsumo() : number {
        return this.consumo
    }
    
    public adicionarConsumo(valorConsumido: number) {
        this.consumo+=valorConsumido
    }
}