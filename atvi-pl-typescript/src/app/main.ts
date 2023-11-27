import Entrada from "../io/entrada";
import Cliente from "../modelo/cliente";
import Empresa from "../modelo/empresa";
import AlterarCliente from "../negocio/alterarCliente";
import AlterarPet from "../negocio/alterarPet";
import AlterarProduto from "../negocio/alterarProduto";
import AlterarServico from "../negocio/alterarServico";
import CadastroCliente from "../negocio/cadastroCliente";
import CadastroPet from "../negocio/cadastroPet";
import CadastroProduto from "../negocio/cadastroProduto";
import CadastroServico from "../negocio/cadastroServico";
import DeletarCliente from "../negocio/deletarCliente";
import DeletarPet from "../negocio/deletarPet";
import DeletarProduto from "../negocio/deletarProduto";
import DeletarServico from "../negocio/deletarServico";
import ListagemClientes from "../negocio/listagemClientes";
import ListagemPets from "../negocio/listagemPets";
import ListagemProdutos from "../negocio/listagemProdutos";
import ListagemServicos from "../negocio/listagemServicos";
import PreencheBanco from "./preencherBanco";

console.log(`Bem-vindo ao melhor sistema de gerenciamento de pet shops e clínicas veterinarias`)
let empresa = new Empresa()
let execucao = true
let preencherBanco = new PreencheBanco(empresa)
//preencherBanco.preencher()
while (execucao) {
    console.log(`Opções:`);
    console.log(`1 - Cadastrar cliente`);
    console.log(`2 - Listar todos os clientes`);
    console.log(`3 - Alterar cliente`);
    console.log(`4 - Deletar cliente`);
    console.log(`5 - Cadastrar Pets`);
    console.log(`6 - Listar pets de um cliente`);
    console.log(`7 - Alterar Pets`);
    console.log(`8 - Deletar Pets`);
    console.log(`9 - Cadastrar produto`);
    console.log(`10 - Listar todos os produtos`);
    console.log(`11 - Alterar produto`);
    console.log(`12 - Deletar produto`);
    console.log(`13 - Cadastrar serviço`);
    console.log(`14 - Listar todos os serviços`);
    console.log(`15 - Alterar serviço`);
    console.log(`16 - Deletar serviço`);
    console.log(`17 - Registrar compra de cliente`);
    console.log(`18 - Listar produtos mais comprado por raça e tipo`);
    console.log(`19 - Listar serviços mais comprado por raça e tipo`);
    console.log(`20 - Listar produtos mais comprado`);
    console.log(`21 - Listar serviços mais comprado`);
    console.log(`22 - Listar 10 cliente que mais compraram produtos`);
    console.log(`23 - Listar 10 cliente que mais compraram serviços`);
    console.log(`24 - Listar 5 cliente que mais gastaram em valor`);

    console.log(`0 - Sair\n\n`);
    
    let entrada = new Entrada()
    let opcao = entrada.receberNumero(`Por favor, escolha uma opção: `)
    console.log('\n');
    
    let clienteCpf: string;
    let clientes: Cliente[]
    let listagemClientes = new ListagemClientes(empresa.getClientes)
    let listagemProdutos = new ListagemProdutos(empresa.getProdutos)
    let listagemServicos = new ListagemServicos(empresa.getServicos)

    switch (opcao) {

        case 1:
            let cadastro = new CadastroCliente(empresa.getClientes)
            cadastro.cadastrar()
            break;

        case 2:
            listagemClientes.listar()
            break;

        case 3:
            listagemClientes.listar()
            let alterarCliente = new AlterarCliente(empresa.getClientes)
            alterarCliente.alterar()
            break;


        case 4:
            listagemClientes.listarComIndex()
            let deletarCliente = new DeletarCliente(empresa)
            deletarCliente.deletar()
            break;

        case 5:
            listagemClientes.listar()
            clienteCpf = entrada.receberTexto("Digite o Cpf do cliente que você irá cadastrar o pet:  ")
            clientes = empresa.getClientes.filter(cliente => cliente.getCpf.getValor === clienteCpf
            );
            if (clientes.length > 0) {
                let cadastroPet = new CadastroPet(clientes[0].getPets)
                cadastroPet.cadastrar()
            } else {
                console.log('Cliente não cadastrado!\n\n');

            }
            break;

        case 6:
            listagemClientes.listar()
            clienteCpf = entrada.receberTexto("Digite o Cpf do cliente que você ver os pets:  ")
            clientes = empresa.getClientes.filter(cliente => cliente.getCpf.getValor === clienteCpf
            );
            if (clientes.length > 0) {
                let listagemPets = new ListagemPets(clientes[0].getPets)
                listagemPets.listar()
            } else {
                console.log('Cliente não cadastrado!\n\n');

            }
            break;

        case 7:
            listagemClientes.listar()
            clienteCpf = entrada.receberTexto("Digite o Cpf do cliente que você irá alterar o cadastro do pet:  ")
            clientes = empresa.getClientes.filter(cliente => cliente.getCpf.getValor === clienteCpf
            );
            if (clientes.length > 0) {
                let listagemPets = new ListagemPets(clientes[0].getPets)
                listagemPets.listarComIndex()
                let alterarPet = new AlterarPet(clientes[0].getPets)
                alterarPet.alterar()
            } else {
                console.log('Cliente não cadastrado!\n\n');

            }
            break;

        case 8:
            listagemClientes.listar()
            clienteCpf = entrada.receberTexto("Digite o Cpf do cliente que você irá remover o pet:  ")
            clientes = empresa.getClientes.filter(cliente => cliente.getCpf.getValor === clienteCpf);
            if (clientes.length > 0) {
                let listagemPets = new ListagemPets(clientes[0].getPets)
                listagemPets.listarComIndex()
                let deletarPet = new DeletarPet(clientes[0])
                deletarPet.deletar()
            } else {
                console.log('Cliente não cadastrado!\n\n');

            }
            break;

        case 9:
            let cadastroProduto = new CadastroProduto(empresa.getProdutos)
            cadastroProduto.cadastrar()
            break;

        case 10:
            listagemProdutos.listar()
            break;

        case 11:
            listagemProdutos.listarComIndex()
            let alterarProduto = new AlterarProduto(empresa.getProdutos)
            alterarProduto.alterar()
            break;

        case 12:

            listagemProdutos.listarComIndex()
            let deletarProduto = new DeletarProduto(empresa)
            deletarProduto.deletar()
            break;

        case 13:
            let cadastroServico = new CadastroServico(empresa.getServicos)
            cadastroServico.cadastrar()
            break;

        case 14:
            listagemServicos.listar()
            break;

        case 15:
            listagemServicos.listarComIndex()
            let alterarServico = new AlterarServico(empresa.getServicos)
            alterarServico.alterar()
            break;

        case 16:
            listagemServicos.listarComIndex()
            let deletarServico = new DeletarServico(empresa)
            deletarServico.deletar()
            break;

        case 17:
            empresa.registrarCompra()
            break;

        case 18:
            empresa.getConsumosPorRacatipo.forEach(consumoRacaTipo => consumoRacaTipo.ordenarProdutoConsumoPorConsumoDecrescente())
            empresa.listarConsumoRacaTipoProduto()
            break;

        case 19:
            empresa.getConsumosPorRacatipo.forEach(consumoRacaTipo => consumoRacaTipo.ordenarProdutoConsumoPorConsumoDecrescente())
            empresa.listarConsumoRacaTipoServico()
            break;

        case 20: // Listar Produto mais consumido
            empresa.listarProdutoMaisConsumidos()
            break;

        case 21: // Listar Serviço mais consumido
            empresa.listarServicoMaisConsumidos()
            break;

        case 22: // Listar 10 Cliente mais consumiram Produto
            empresa.listaDezClienteMaisConsumidosProduto()
            break;

        case 23: // Listar 10 Cliente mais consumiram Produto Serviço
            empresa.listaDezClienteMaisConsumidosServico()
            break;

        case 24: // Listar 5 Cliente mais gastaram em valor
            empresa.listarClientePorGasto()
            break;

        case 0:
            execucao = false
            console.log(`Até mais`)
            break;

        default:
            console.log(`Operação não entendida :(`)
    }
}