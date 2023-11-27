import Pets from "../modelo/pet";
import Listagem from "./listagem";

export default class ListagemPets extends Listagem {
    private pets: Array<Pets>
    constructor(pets: Array<Pets>) {
        super()
        this.pets = pets
    }
    
    public set setPetss(pets: Array<Pets>) {
        this.pets = pets;
    }
    

    public listar(): void {
        console.log(`\nLista de todos os pets:`);
        this.pets.forEach(pet => {
            console.log(`Nome do Pet: ` + pet.getNome);
            console.log(`Tipo do Pet: ` + pet.getTipo);
            console.log(`Raça do Pet: ` + pet.getRaca);
            console.log(`Gênero do Pet: ` + pet.getGenero);
            console.log(`--------------------------------------`);
        });
        console.log(`\n`);
    }
    public listarComIndex(): void {
        console.log(`\nLista de todos os pets com index:`);
        for (let index = 0; index < this.pets.length; index++) {
            const pet = this.pets[index];
            console.log(`Index: ${index}`);
            console.log(`Nome do Pet: ` + pet.getNome);
            console.log(`Tipo do Pet: ` + pet.getTipo);
            console.log(`Raça do Pet: ` + pet.getRaca);
            console.log(`Gênero do Pet: ` + pet.getGenero);
            console.log(`--------------------------------------`);
        }
        console.log(`\n`);
    }
}