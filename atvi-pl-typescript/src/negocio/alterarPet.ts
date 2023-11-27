import Entrada from "../io/entrada";
import Pet from "../modelo/pet";
import Alterar from "./alterar";

export default class AlterarPet extends Alterar {
    private pets : Array<Pet>
    private entrada: Entrada
    constructor(pets : Array<Pet>) {
        super();
        this.pets = pets
        this.entrada = new Entrada()
    }
    public alterar(): void {
        let index = this.entrada.receberNumero("Digite o index do Pet que você irá alterar:  ")
        let pet = this.pets[index]
        let nome = this.entrada.receberTexto("Digite o novo nome do Pet: ")
        let raca = this.entrada.receberTexto("Digite a nova raça do Pet: ")
        let tipo = this.entrada.receberTexto("Digite o novo tipo do Pet: ")
        let genero = this.entrada.receberTexto("Digite o novo gênero do Pet: ")
        pet.setNome = nome
        pet.setGenero = genero
        pet.setRaca = raca
        pet.setTipo = tipo
        console.log("Alterações Realizadas com Sucesso!");
        
    }
}