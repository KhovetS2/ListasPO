import CPF from "./cpf"
import Pet from "./pet"
import Produto from "./produto"
import ProdutoConsumo from "./produtoConsumo"
import RG from "./rg"
import Servico from "./servico"
import ServicoConsumo from "./servicoConsumo"
import Telefone from "./telefone"

export default class Cliente {
    public nome: string
    public nomeSocial: string
    private cpf: CPF
    private rgs: Array<RG>
    private dataCadastro: Date
    private telefones: Array<Telefone>
    private produtosConsumidos: Array<ProdutoConsumo>
    private servicosConsumidos: Array<ServicoConsumo>
    private pets: Array<Pet>
    constructor(nome: string, nomeSocial: string, cpf: CPF) {
        this.nome = nome
        this.nomeSocial = nomeSocial
        this.cpf = cpf
        this.rgs = []
        this.dataCadastro = new Date()
        this.telefones = []
        this.produtosConsumidos = []
        this.servicosConsumidos = []
        this.pets = []
    }
    public get getCpf(): CPF {
        return this.cpf
    }
    public set setCpf(cpf:CPF){
        this.cpf = cpf
    }
    public get getRgs(): Array<RG> {
        return this.rgs
    }
    public get getDataCadastro(): Date {
        return this.dataCadastro
    }
    public get getTelefones(): Array<Telefone> {
        return this.telefones
    }
    public get getProdutosConsumidos(): Array<ProdutoConsumo> {
        return this.produtosConsumidos
    }
    public get getServicosConsumidos(): Array<ServicoConsumo> {
        return this.servicosConsumidos
    }
    public get getPets(): Array<Pet>{
        return this.pets
    }
    public set setPets(pets: Array<Pet>){
        this.pets=pets
    }
}