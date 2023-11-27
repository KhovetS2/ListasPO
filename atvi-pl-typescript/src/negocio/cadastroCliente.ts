import Entrada from "../io/entrada"
import Cliente from "../modelo/cliente"
import CPF from "../modelo/cpf"
import RG from "../modelo/rg"
import Telefone from "../modelo/telefone"
import Cadastro from "./cadastro"

export default class CadastroCliente extends Cadastro {
    private clientes: Array<Cliente>
    private entrada: Entrada
    constructor(clientes: Array<Cliente>) {
        super()
        this.clientes = clientes
        this.entrada = new Entrada()
    }
    public cadastrar(): void {
        console.log(`\nInício do cadastro do cliente`);
        let nome = this.entrada.receberTexto(`Por favor informe o nome do cliente: `)
        let nomeSocial = this.entrada.receberTexto(`Por favor informe o nome social do cliente: `)
        let valor = this.entrada.receberTexto(`Por favor informe o número do cpf: `);
        while (this.clientes.filter(cliente => cliente.getCpf.getValor === valor).length > 0 || valor.length !== 11) {
            if (valor.length === 11) {
                valor = this.entrada.receberTexto(`CPF informado já está cadastrado, informe o número do cpf: `);
            } else {
                valor = this.entrada.receberTexto(`CPF informado está com a quantidade de digitos erradas, informe o número do cpf: `);
            }

        }
        let data = this.entrada.receberTexto(`Por favor informe a data de emissão do cpf, no padrão dd/mm/yyyy: `);
        let partesData = data.split('/')
        while (data.length !== 10 || partesData.length !== 3) {
            data = this.entrada.receberTexto(`Data informada não está no padrão, informe a data de emissão do cpf, no padrão dd/mm/yyyy: `);
            partesData = data.split('/')
        }
        let ano = new Number(partesData[2].valueOf()).valueOf()
        let mes = new Number(partesData[1].valueOf()).valueOf()
        let dia = new Number(partesData[0].valueOf()).valueOf()
        let dataEmissao = new Date(ano, mes, dia)
        let cpf = new CPF(valor, dataEmissao);
        let cliente = new Cliente(nome, nomeSocial, cpf);
        let rgWhile = true
        valor = this.entrada.receberTexto(`Por favor informe o número do RG: `);
        data = this.entrada.receberTexto(`Por favor informe a data de emissão do RG, no padrão dd/mm/yyyy: `);
        partesData = data.split('/')
        while (data.length !== 10 || partesData.length !== 3) {
            data = this.entrada.receberTexto(`Data informada não está no padrão, informe a data de emissão do RG, no padrão dd/mm/yyyy: `);
            partesData = data.split('/')
        }
        ano = new Number(partesData[2].valueOf()).valueOf()
        mes = new Number(partesData[1].valueOf()).valueOf()
        dia = new Number(partesData[0].valueOf()).valueOf()
        dataEmissao = new Date(ano, mes, dia)
        let rg = new RG(valor, dataEmissao)
        cliente.getRgs.push(rg)
        while (rgWhile) {
            console.log('Digite 1 para continuar cadastrando outros rgs');
            console.log('Digite 0 para continuar com o cadastro do cliente');

            let opcao = this.entrada.receberNumero(`Por favor informe a opção: `);
            switch (opcao) {
                case 1:
                    valor = this.entrada.receberTexto(`Por favor informe o número do RG: `);
                    data = this.entrada.receberTexto(`Por favor informe a data de emissão do RG, no padrão dd/mm/yyyy: `);
                    partesData = data.split('/')
                    while (data.length !== 10 || partesData.length !== 3) {
                        data = this.entrada.receberTexto(`Data informada não está no padrão, informe a data de emissão do RG, no padrão dd/mm/yyyy: `);
                        partesData = data.split('/')
                    }
                    ano = new Number(partesData[2].valueOf()).valueOf()
                    mes = new Number(partesData[1].valueOf()).valueOf()
                    dia = new Number(partesData[0].valueOf()).valueOf()
                    dataEmissao = new Date(ano, mes, dia)
                    let rg = new RG(valor, dataEmissao)
                    cliente.getRgs.push(rg)
                    break;
                
                case 0:
                    rgWhile=false
                    break;
                default:
                    console.log('Opção inválida');
                    break;
            }
        }

        let telefoneWhile = true
        while (telefoneWhile) {
            console.log('Digite 1 para cadastrar telefone');
            console.log('Digite 0 para continuar com o cadastro do cliente');

            let opcao = this.entrada.receberNumero(`Por favor informe a opção: `);
            let ddd: string;
            let numero: string;
            switch (opcao) {
                case 0:
                    telefoneWhile = false
                    break;
                case 1:
                    ddd = this.entrada.receberTexto(`Por favor informe o ddd: `);
                    while (ddd.length !== 2) {
                        ddd = this.entrada.receberTexto(`Quantidade de digitos invalido, por favor informe o ddd: `);
                    }
                    numero = this.entrada.receberTexto(`Por favor informe o numero: `);
                    while (numero.length !== 9 && numero.length !== 8) {
                        numero = this.entrada.receberTexto(`Quantidade de digitos invalido, por favor informe o numero: `);
                    }
                    let telefone = new Telefone(ddd, numero)
                    cliente.getTelefones.push(telefone)
                    break;
                default:
                    console.log('Opção inválida');
                    break;
            }
        }
        this.clientes.push(cliente)
        console.log(`\nCadastro concluído :)\n`);
    }
}