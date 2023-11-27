import Entrada from "../io/entrada";
import Cliente from "../modelo/cliente";
import CPF from "../modelo/cpf";
import RG from "../modelo/rg";
import Telefone from "../modelo/telefone";
import Alterar from "./alterar";

export default class AlterarCliente extends Alterar {
    private clientes: Array<Cliente>
    private entrada: Entrada
    constructor(clientes: Array<Cliente>) {
        super();
        this.clientes = clientes
        this.entrada = new Entrada()
    }
    public alterar(): void {
        let clienteCpf = this.entrada.receberTexto("Digite o Cpf do cliente que você irá alterar:  ")
        let cliente = this.clientes.filter(cliente => cliente.getCpf.getValor === clienteCpf);
        if (cliente.length > 0) {
            let nome = this.entrada.receberTexto(`Por favor informe a alteração nome do cliente: `)
            let nomeSocial = this.entrada.receberTexto(`Por favor informe a alteração nome social do cliente: `)
            let valor = this.entrada.receberTexto(`Por favor informe o número do cpf: `);
            while (this.clientes.filter(cliente => cliente.getCpf.getValor === valor).length > 0 && valor !== clienteCpf) {
                if (valor.length === 11) {
                    valor = this.entrada.receberTexto(`CPF informado já está cadastrado, informe o número do cpf: `);
                } else {
                    valor = this.entrada.receberTexto(`CPF informado está com a quantidade de digitos erradas, informe o número do cpf: `);
                }

            }
            let data = this.entrada.receberTexto(`Por favor informe a data de emissão do cpf, no padrão dd/mm/yyyy: `);
            let partesData = data.split('/')
            while (data.length !== 10 && partesData.length !== 3) {
                data = this.entrada.receberTexto(`Data informada não está no padrão, informe a data de emissão do cpf, no padrão dd/mm/yyyy: `);
                partesData = data.split('/')
            }
            let ano = new Number(partesData[2].valueOf()).valueOf()
            let mes = new Number(partesData[1].valueOf()).valueOf()
            let dia = new Number(partesData[0].valueOf()).valueOf()
            let dataEmissao = new Date(ano, mes, dia)
            let cpf = new CPF(valor, dataEmissao);
            let rgWhile = true
            while (rgWhile) {
                console.log('Digite 1 para cadastrar outros rgs');
                console.log('Digite 2 para alterar os existentes');
                console.log('Digite 0 para continuar com as alterações do cliente');

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
                        cliente[0].getRgs.push(rg)
                        break;

                    case 2:
                        for (let index = 0; index < cliente[0].getRgs.length; index++) {
                            const rg = cliente[0].getRgs[index];
                            console.log(`RG: ${rg.getValor}, Data de Emissão: ${rg.getDataEmissao}`)
                            valor = this.entrada.receberTexto(`Por favor informe o novo número do RG: `);
                            data = this.entrada.receberTexto(`Por favor informe a nova data de emissão do RG, no padrão dd/mm/yyyy: `);
                            partesData = data.split('/')
                            while (data.length !== 10 || partesData.length !== 3) {
                                data = this.entrada.receberTexto(`Data informada não está no padrão, informe a data de emissão do RG, no padrão dd/mm/yyyy: `);
                                partesData = data.split('/')
                            }
                            ano = new Number(partesData[2].valueOf()).valueOf()
                            mes = new Number(partesData[1].valueOf()).valueOf()
                            dia = new Number(partesData[0].valueOf()).valueOf()
                            dataEmissao = new Date(ano, mes, dia)
                            
                            rg.setValor = valor
                            rg.setDataEmissao = dataEmissao
                        }
                        break;

                    case 0:
                        rgWhile = false
                        break;
                    default:
                        console.log('Opção inválida');
                        break;
                }
            }

            let telefoneWhile = true
            while (telefoneWhile) {
                console.log('Digite 1 para cadastrar telefone');
                console.log('Digite 2 para alterar os existentes');
                console.log('Digite 0 para continuar com as alterações do cliente');

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
                        cliente[0].getTelefones.push(telefone)
                        break;

                    case 2:
                        for (let index = 0; index < cliente[0].getTelefones.length; index++) {
                            const telefone = cliente[0].getTelefones[index];
                            console.log(`Telefone: (${telefone.getDdd}) ${telefone.getNumero}`)
                            ddd = this.entrada.receberTexto(`Por favor informe o novo ddd: `);
                            while (ddd.length !== 2) {
                                ddd = this.entrada.receberTexto(`Quantidade de digitos invalido, por favor informe o novo ddd: `);
                            }
                            numero = this.entrada.receberTexto(`Por favor informe o novo numero: `);
                            while (numero.length !== 9 && numero.length !== 8) {
                                numero = this.entrada.receberTexto(`Quantidade de digitos invalido, por favor informe o novo numero: `);
                            }
                            telefone.setDdd = ddd
                            telefone.setNumero = numero
                        }
                        break;

                    default:
                        console.log('Opção inválida');
                        break;
                }
            }
            cliente[0].nome = nome
            cliente[0].nomeSocial = nomeSocial
            cliente[0].setCpf = cpf
            console.log('Alterações Aplicadas com Sucesso');
            
        } else {
            console.log('Cliente não cadastrado!\n\n');
        }

    }
}