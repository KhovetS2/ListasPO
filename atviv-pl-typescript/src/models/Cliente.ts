import Endereco from "./Endereço"
import Telefone from "./Telefone"

export default interface Cliente{
    id: number
    nome: string
    nomeSocial: string
    email: string
    endereco: Endereco
    telefones: Array<Telefone>
}