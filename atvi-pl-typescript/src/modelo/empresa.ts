import Entrada from "../io/entrada"
import ListagemClientes from "../negocio/listagemClientes"
import ListagemPets from "../negocio/listagemPets"
import ListagemProdutos from "../negocio/listagemProdutos"
import ListagemServicos from "../negocio/listagemServicos"
import Cliente from "./cliente"
import ConsumoRacaTipo from "./consumoRacaTipo"
import Produto from "./produto"
import ProdutoConsumo from "./produtoConsumo"
import Servico from "./servico"
import ServicoConsumo from "./servicoConsumo"

export default class Empresa {
    private clientes: Array<Cliente>
    private produtos: Array<Produto>
    private produtosConsumidos: Array<ProdutoConsumo>
    private servicos: Array<Servico>
    private servicosConsumidos: Array<ServicoConsumo>
    private consumosPorRacatipo: Array<ConsumoRacaTipo>

    constructor() {
        this.clientes = []
        this.produtos = []
        this.servicos = []
        this.produtosConsumidos = []
        this.servicosConsumidos = []
        this.consumosPorRacatipo = []
    }
    public get getClientes() {
        return this.clientes
    }
    public get getProdutos() {
        return this.produtos
    }
    public get getServicos() {
        return this.servicos
    }
    public set setClientes(clientes: Array<Cliente>) {
        this.clientes = clientes
    }
    public set setProdutos(produtos: Array<Produto>) {
        this.produtos = produtos
    }
    public set setServicos(servicos: Array<Servico>) {
        this.servicos = servicos
    }
    public get getProdutosConsumidos(): Array<ProdutoConsumo> {
        return this.produtosConsumidos
    }
    public set setProdutosConsumidos(value: Array<ProdutoConsumo>) {
        this.produtosConsumidos = value
    }
    public get getServicosConsumidos(): Array<ServicoConsumo> {
        return this.servicosConsumidos
    }
    public set setServicosConsumidos(value: Array<ServicoConsumo>) {
        this.servicosConsumidos = value
    }
    public get getConsumosPorRacatipo(): Array<ConsumoRacaTipo> {
        return this.consumosPorRacatipo
    }
    public set setConsumosPorRacatipo(value: Array<ConsumoRacaTipo>) {
        this.consumosPorRacatipo = value
    }

    /**
     * registrarCompra
     */
    public registrarCompra() {
        let listagemClientes = new ListagemClientes(this.clientes)
        let listagemProdutos = new ListagemProdutos(this.produtos)
        let listagemServicos = new ListagemServicos(this.servicos)
        let entrada = new Entrada()
        listagemClientes.listarComIndex()
        let index = entrada.receberNumero("Digite o index do Cliente que realizou a compra: ")
        let cliente = this.clientes[index]
        let listagemPets = new ListagemPets(cliente.getPets)
        listagemPets.listarComIndex()
        index = entrada.receberNumero("Digite o index do pet para qual foi a compra do cliente: ")
        if (index >= cliente.getPets.length) {
            console.log('Valor digitado invalido');
            return
        }
        let pet = cliente.getPets[index]
        let opcao = entrada.receberNumero("Digite 1 para compra de Produtos e 2 para compra de serviços: ")
        let quantidade: number;
        let isInTheList: boolean;
        switch (opcao) {
            case 1:
                listagemProdutos.listarComIndex()
                index = entrada.receberNumero("Digite o index do Produto comprado: ")
                quantidade = entrada.receberNumero("Digite a quantidade de Produto comprado: ")
                let produto = this.produtos[index]
                isInTheList = false
                for (let i = 0; i < this.produtosConsumidos.length; i++) {
                    const produtoConsumo = this.produtosConsumidos[i];
                    if (produtoConsumo.getProduto === produto) {
                        isInTheList = true
                        produtoConsumo.adicionarConsumo(quantidade)
                    }

                }
                if (isInTheList === false) {
                    let produtoConsumo = new ProdutoConsumo(produto)
                    produtoConsumo.adicionarConsumo(quantidade)
                    this.produtosConsumidos.push(produtoConsumo)
                }

                // Cliente parte
                isInTheList = false
                for (let i = 0; i < cliente.getProdutosConsumidos.length; i++) {
                    const produtoConsumo = this.produtosConsumidos[i];
                    if (produtoConsumo.getProduto === produto) {
                        isInTheList = true
                        produtoConsumo.adicionarConsumo(quantidade)
                    }

                }
                if (isInTheList === false) {
                    let produtoConsumo = new ProdutoConsumo(produto)
                    produtoConsumo.adicionarConsumo(quantidade)
                    cliente.getProdutosConsumidos.push(produtoConsumo)
                }

                // Consumo Raça e Tipo parte
                isInTheList = false
                for (let i = 0; i < this.consumosPorRacatipo.length; i++) {
                    const consumoRacaTipo = this.consumosPorRacatipo[i];
                    if (consumoRacaTipo.getRaca === pet.getRaca && consumoRacaTipo.getTipo === pet.getTipo) {
                        isInTheList = true
                        let isInTheListProduto = false
                        for (let i = 0; i < consumoRacaTipo.getProdutoConsumo.length; i++) {
                            const produtoConsumo = consumoRacaTipo.getProdutoConsumo[i];
                            if (produtoConsumo.getProduto === produto) {
                                isInTheListProduto = true
                                produtoConsumo.adicionarConsumo(quantidade)
                            }

                        }
                        if (isInTheListProduto === false) {
                            let produtoConsumo = new ProdutoConsumo(produto)
                            produtoConsumo.adicionarConsumo(quantidade)
                            consumoRacaTipo.getProdutoConsumo.push(produtoConsumo)
                        }
                    }
                }
                if (isInTheList === false) {
                    let consumoRacaTipo = new ConsumoRacaTipo(pet.getTipo, pet.getRaca)
                    let produtoConsumo = new ProdutoConsumo(produto)
                    produtoConsumo.adicionarConsumo(quantidade)
                    consumoRacaTipo.getProdutoConsumo.push(produtoConsumo)
                    this.consumosPorRacatipo.push(consumoRacaTipo)
                }
                break;

            case 2:
                listagemServicos.listarComIndex()
                index = entrada.receberNumero("Digite o index do Serviço comprado: ")
                quantidade = entrada.receberNumero("Digite a quantidade de Serviço comprado: ")
                let servico = this.servicos[index]
                isInTheList = false
                for (let i = 0; i < this.servicosConsumidos.length; i++) {
                    const servicoConsumo = this.servicosConsumidos[i];
                    if (servicoConsumo.getServico === servico) {
                        isInTheList = true
                        servicoConsumo.adicionarConsumo(quantidade)
                    }

                }
                if (isInTheList === false) {
                    let servicoConsumo = new ServicoConsumo(servico)
                    servicoConsumo.adicionarConsumo(quantidade)
                    this.servicosConsumidos.push(servicoConsumo)
                }

                // Cliente parte
                isInTheList = false
                for (let i = 0; i < cliente.getServicosConsumidos.length; i++) {
                    const servicoConsumo = cliente.getServicosConsumidos[i];
                    if (servicoConsumo.getServico === servico) {
                        isInTheList = true
                        servicoConsumo.adicionarConsumo(quantidade)
                    }

                }
                if (isInTheList === false) {
                    let servicoConsumo = new ServicoConsumo(servico)
                    servicoConsumo.adicionarConsumo(quantidade)
                    cliente.getServicosConsumidos.push(servicoConsumo)
                }

                // Consumo Raça e Tipo
                isInTheList = false
                for (let i = 0; i < this.consumosPorRacatipo.length; i++) {
                    const consumoRacaTipo = this.consumosPorRacatipo[i];
                    if (consumoRacaTipo.getRaca === pet.getRaca && consumoRacaTipo.getTipo === pet.getTipo) {
                        isInTheList = true
                        let isInTheListServico = false
                        for (let i = 0; i < consumoRacaTipo.getServicoConsumo.length; i++) {
                            const servicoConsumo = consumoRacaTipo.getServicoConsumo[i];
                            if (servicoConsumo.getServico === servico) {
                                isInTheListServico = true
                                servicoConsumo.adicionarConsumo(quantidade)
                            }

                        }
                        if (isInTheListServico === false) {
                            let servicoConsumo = new ServicoConsumo(servico)
                            servicoConsumo.adicionarConsumo(quantidade)
                            consumoRacaTipo.getServicoConsumo.push(servicoConsumo)
                        }
                    }
                }
                if (isInTheList === false) {
                    let consumoRacaTipo = new ConsumoRacaTipo(pet.getTipo, pet.getRaca)
                    let servicoConsumo = new ServicoConsumo(servico)
                    servicoConsumo.adicionarConsumo(quantidade)
                    consumoRacaTipo.getServicoConsumo.push(servicoConsumo)
                    this.consumosPorRacatipo.push(consumoRacaTipo)
                }
                break;

            default:
                console.log("Valor digitado inválido!");

                break;
        }

    }
    private ordenarPorProdutoConsumoRacaTipoDecrescente() {
        this.consumosPorRacatipo.sort((a, b) => {
            const consumoA = a.getProdutoConsumo.reduce((total, produto) => total + produto.getConsumo, 0);
            const consumoB = b.getProdutoConsumo.reduce((total, produto) => total + produto.getConsumo, 0);
            return consumoB - consumoA;
        });
    }
    private ordenarPorServicoConsumoRacaTipoDecrescente() {
        this.consumosPorRacatipo.sort((a, b) => {
            const consumoA = a.getServicoConsumo.reduce((total, servico) => total + servico.getConsumo, 0);
            const consumoB = b.getServicoConsumo.reduce((total, servico) => total + servico.getConsumo, 0);
            return consumoB - consumoA;
        });
    }

    /**
     * listarConsumoRacaTipoProduto
     */
    public listarConsumoRacaTipoProduto() {
        this.ordenarPorProdutoConsumoRacaTipoDecrescente()
        this.consumosPorRacatipo.forEach(consumoRacaTipo => {
            console.log(`-----------------------------------------------------------`)
            console.log(`Raça: ${consumoRacaTipo.getRaca}`);
            console.log(`Tipo: ${consumoRacaTipo.getTipo}`);
            consumoRacaTipo.getProdutoConsumo.forEach(produtoConsumo => {
                console.log(`--------------------------------------`);
                console.log(`Nome do Produto: ` + produtoConsumo.getProduto.getNome);
                console.log(`Valor do Produto: ` + produtoConsumo.getProduto.getPreco);
                console.log(`Consumo do Produto: ` + produtoConsumo.getConsumo);
                console.log(`--------------------------------------`);
            });
            console.log(`-----------------------------------------------------------`)
        });
    }

    /**
     * listarConsumoRacaTipoServico
     */
    public listarConsumoRacaTipoServico() {
        this.ordenarPorServicoConsumoRacaTipoDecrescente()
        this.consumosPorRacatipo.forEach(consumoRacaTipo => {
            console.log(`-----------------------------------------------------------`)
            console.log(`Raça: ${consumoRacaTipo.getRaca}`);
            console.log(`Tipo: ${consumoRacaTipo.getTipo}`);
            consumoRacaTipo.getServicoConsumo.forEach(servicoConsumo => {
                console.log(`--------------------------------------`);
                console.log(`Nome do Serviço: ` + servicoConsumo.getServico.getNome);
                console.log(`Valor do Serviço: ` + servicoConsumo.getServico.getPreco);
                console.log(`Consumo do Serviço: ` + servicoConsumo.getConsumo);
                console.log(`--------------------------------------`);
            });
            console.log(`-----------------------------------------------------------`)
        });
    }

    /**
     * listarProdutoMaisConsumidos
     */
    public listarProdutoMaisConsumidos() {
        this.produtosConsumidos.sort((a, b) => b.getConsumo - a.getConsumo);
        this.produtosConsumidos.forEach(produtoConsumo => {
            console.log(`--------------------------------------`);
            console.log(`Nome do Produto: ` + produtoConsumo.getProduto.getNome);
            console.log(`Valor do Produto: ` + produtoConsumo.getProduto.getPreco);
            console.log(`Consumo do Produto: ` + produtoConsumo.getConsumo);
            console.log(`--------------------------------------`);
        });
    }

    /**
     * listarProdutoMaisConsumidos
     */
    public listarServicoMaisConsumidos() {
        this.servicosConsumidos.sort((a, b) => b.getConsumo - a.getConsumo);
        this.servicosConsumidos.forEach(servicoConsumo => {
            console.log(`--------------------------------------`);
            console.log(`Nome do Serviço: ` + servicoConsumo.getServico.getNome);
            console.log(`Valor do Serviço: ` + servicoConsumo.getServico.getPreco);
            console.log(`Consumo do Serviço: ` + servicoConsumo.getConsumo);
            console.log(`--------------------------------------`);
        });
    }


    private ordenarPorProdutoConsumoClienteDecrescente() {
        this.clientes.sort((a, b) => {
            const consumoA = a.getProdutosConsumidos.reduce((total, produto) => total + produto.getConsumo, 0);
            const consumoB = b.getProdutosConsumidos.reduce((total, produto) => total + produto.getConsumo, 0);
            return consumoB - consumoA;
        });
    }
    private ordenarPorServicoConsumoClienteDecrescente() {
        this.clientes.sort((a, b) => {
            const consumoA = a.getServicosConsumidos.reduce((total, servico) => total + servico.getConsumo, 0);
            const consumoB = b.getServicosConsumidos.reduce((total, servico) => total + servico.getConsumo, 0);
            return consumoB - consumoA;
        });
    }
    private ordenarClientePorValorDecrescente() {
        this.clientes.sort((a, b) => {
            const consumoA = a.getServicosConsumidos.reduce((total, servico) => total + (servico.getConsumo*servico.getServico.getPreco) , 0)+ a.getProdutosConsumidos.reduce((total, produto) => total + (produto.getConsumo*produto.getProduto.getPreco) , 0);
            const consumoB = b.getServicosConsumidos.reduce((total, servico) => total + (servico.getConsumo*servico.getServico.getPreco) , 0)+ b.getProdutosConsumidos.reduce((total, produto) => total + (produto.getConsumo*produto.getProduto.getPreco) , 0);
            return consumoB - consumoA;
        });
    }

    /**
     * listaDezClienteMaisConsumidosProduto
     */
    public listaDezClienteMaisConsumidosProduto() {
        this.ordenarPorProdutoConsumoClienteDecrescente()
        for (let i = 0; i < 10; i++) {
            const cliente = this.clientes[i];
            console.log(`Lugar: ${i + 1}`);
            console.log(`Nome: ` + cliente.nome);
            console.log(`Nome social: ` + cliente.nomeSocial);
            console.log(`CPF: ` + cliente.getCpf.getValor);
            cliente.getRgs.forEach(rg => console.log(`RG: ` + rg.getValor))
            cliente.getTelefones.forEach(telefone => console.log(`Telefone: (${telefone.getDdd}) ${telefone.getNumero}`))
            console.log(`--------------------------------------`);
            if (i + 1 === this.clientes.length) {
                break
            }
        }
    }

    /**
     * listaDezClienteMaisConsumidosProduto
     */
    public listaDezClienteMaisConsumidosServico() {
        this.ordenarPorServicoConsumoClienteDecrescente()
        for (let i = 0; i < 10; i++) {
            const cliente = this.clientes[i];
            console.log(`Lugar: ${i + 1}`);
            console.log(`Nome: ` + cliente.nome);
            console.log(`Nome social: ` + cliente.nomeSocial);
            console.log(`CPF: ` + cliente.getCpf.getValor);
            cliente.getRgs.forEach(rg => console.log(`RG: ` + rg.getValor))
            cliente.getTelefones.forEach(telefone => console.log(`Telefone: (${telefone.getDdd}) ${telefone.getNumero}`))
            console.log(`--------------------------------------`);
            if (i + 1 === this.clientes.length) {
                break
            }
        }
    }

    /**
     * listarClientePorGasto
     */
    public listarClientePorGasto() {
        this.ordenarClientePorValorDecrescente()
        for (let i = 0; i < 5; i++) {
            const cliente = this.clientes[i];
            console.log(`Lugar: ${i + 1}`);
            console.log(`Nome: ` + cliente.nome);
            console.log(`Nome social: ` + cliente.nomeSocial);
            console.log(`CPF: ` + cliente.getCpf.getValor);
            cliente.getRgs.forEach(rg => console.log(`RG: ` + rg.getValor))
            cliente.getTelefones.forEach(telefone => console.log(`Telefone: (${telefone.getDdd}) ${telefone.getNumero}`))
            console.log(`--------------------------------------`);
            if (i + 1 === this.clientes.length) {
                break
            }
        }
    }
}