import Endereco from "./Endereço"
import Pet from "./Pet"
import Telefone from "./Telefone"

export default interface Cliente{
    id: number
    nome: string
    nomeSocial: string
    email: string
    endereco: Array<Endereco>
    telefones: Array<Telefone>
    pets: Array<Pet> | null
}