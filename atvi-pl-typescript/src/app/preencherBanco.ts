import Cliente from "../modelo/cliente";
import ConsumoRacaTipo from "../modelo/consumoRacaTipo";
import CPF from "../modelo/cpf";
import Empresa from "../modelo/empresa";
import Pet from "../modelo/pet";
import Produto from "../modelo/produto";
import ProdutoConsumo from "../modelo/produtoConsumo";
import RG from "../modelo/rg";
import Servico from "../modelo/servico";
import ServicoConsumo from "../modelo/servicoConsumo";
import Telefone from "../modelo/telefone";

export default class PreencheBanco {
    private empresa: Empresa
    constructor(empresa: Empresa) {
        this.empresa = empresa
    }

    /**
     * preencher
     */
    public preencher() {

        let cliente = new Cliente('123','123',new CPF('12312312312', new Date()))
        cliente.getRgs.push(new RG('123', new Date()))
        cliente.getTelefones.push(new Telefone('123', '231241'))
        cliente.getPets.push(new Pet('Jubileu', 'Ave', 'Masculino', 'Pombo'))
        cliente.getPets.push(new Pet('Carlão', 'Cão', 'Masculino', 'Bodercoler'))
        this.empresa.getClientes.push(cliente)

        let consumoRacaTipo = new ConsumoRacaTipo('Pombo','Ave')
        let produto = new Produto('Shampoo', 3.45)
        let produtoConsumo = new ProdutoConsumo(produto)
        produtoConsumo.adicionarConsumo(20)
        consumoRacaTipo.getProdutoConsumo.push(produtoConsumo)
        this.empresa.getProdutosConsumidos.push(produtoConsumo)
        this.empresa.getProdutos.push(produto)
        cliente.getProdutosConsumidos.push(produtoConsumo)
        

        let servico = new Servico('Banho e Tosa', 7.45)
        let servicoConsumo = new ServicoConsumo(servico)
        servicoConsumo.adicionarConsumo(15)
        consumoRacaTipo.getServicoConsumo.push(servicoConsumo)
        this.empresa.getServicosConsumidos.push(servicoConsumo)
        this.empresa.getServicos.push(servico)
        this.empresa.getConsumosPorRacatipo.push(consumoRacaTipo)
        cliente.getServicosConsumidos.push(servicoConsumo)
        
        cliente = new Cliente('321','321',new CPF('1231232412', new Date()))
        cliente.getRgs.push(new RG('123', new Date()))
        cliente.getTelefones.push(new Telefone('123', '231241'))
        cliente.getPets.push(new Pet('Arlan', 'Ave', 'Masculino', 'Pombo'))
        cliente.getPets.push(new Pet('Petricius', 'Cão', 'Masculino', 'Bodercoler'))
        this.empresa.getClientes.push(cliente)
        
        
        consumoRacaTipo = new ConsumoRacaTipo('Bodercoler','Cão')
        produto = new Produto('Sabonete', 6.45)
        produtoConsumo = new ProdutoConsumo(produto)
        produtoConsumo.adicionarConsumo(25)
        consumoRacaTipo.getProdutoConsumo.push(produtoConsumo)
        this.empresa.getProdutosConsumidos.push(produtoConsumo)
        this.empresa.getProdutos.push(produto)
        cliente.getProdutosConsumidos.push(produtoConsumo)


        servico = new Servico('Vacina', 13.25)
        servicoConsumo = new ServicoConsumo(servico)
        servicoConsumo.adicionarConsumo(13)
        consumoRacaTipo.getServicoConsumo.push(servicoConsumo)
        this.empresa.getServicosConsumidos.push(servicoConsumo)
        this.empresa.getServicos.push(servico)
        this.empresa.getConsumosPorRacatipo.push(consumoRacaTipo)
        cliente.getServicosConsumidos.push(servicoConsumo)
        
    }
}