import { Box, Flex, ListItem, OrderedList, Tab, TabList, TabPanel, TabPanels, Tabs, } from "@chakra-ui/react"
import CardConsumoServico from "./CardConsumoServico"
import CardConsumoProduto from "./CardConsumoProduto"
import CardRacaTipoServico from "./CardRacaTipoServico"
import Cliente from "../models/Cliente"
import { Produto } from "../models/Produto"
import { Servico } from "../models/Servico"
import { CompraProduto } from "../models/CompraProduto"
import { CompraServico } from "../models/CompraServico"
import { useEffect, useState } from "react"
import { getAllClientes } from "../services/cliente"
import { getAllProdutos } from "../services/produto"
import { getAllServicos } from "../services/servico"
import { getAllCompraProduto, getAllCompraServico } from "../services/compra"
import CardRacaTipoProduto from "./CardRacaTipoProduto"


interface ClienteValor {
    cliente: Cliente,
    valorGasto: number
}
interface ClienteConsumo {
    cliente: Cliente,
    consumo: number
}
export interface ProdutoConsumo {
    produto: Produto,
    valorGasto: number
}
export interface ServicoConsumo {
    servico: Servico,
    valorGasto: number
}

export interface RacaTipoItem {
    raca: string,
    tipo: string,
    servicoConsumo: ServicoConsumo[],
    produtoConsumo: ProdutoConsumo[]
}

// Função para calcular o valor total gasto por um cliente
const calcularValorGastoCliente = (cliente: Cliente, produtos: Produto[], servicos: Servico[], comprasProdutos: CompraProduto[], comprasServicos: CompraServico[]): number => {
    const comprasClienteProdutos = comprasProdutos.filter(compra => compra.cliente_id === cliente.id);
    const comprasClienteServicos = comprasServicos.filter(compra => compra.cliente_id === cliente.id);

    const valorProdutos = comprasClienteProdutos.reduce((total, compra) => {
        const produto = produtos.find(p => p.id === compra.produto_id);
        return total + (produto ? produto.valor * compra.quatidade : 0);
    }, 0);

    const valorServicos = comprasClienteServicos.reduce((total, compra) => {
        const servico = servicos.find(s => s.id === compra.servico_id);
        return total + (servico ? servico.valor * compra.quatidade : 0);
    }, 0);

    return valorProdutos + valorServicos;
};

// Função para calcular o consumo total por cliente
const calcularConsumoCliente = (cliente: Cliente, comprasProdutos: CompraProduto[], comprasServicos: CompraServico[]): number => {
    const comprasClienteProdutos = comprasProdutos.filter(compra => compra.cliente_id === cliente.id);
    const comprasClienteServicos = comprasServicos.filter(compra => compra.cliente_id === cliente.id);

    const quantidadeProdutos = comprasClienteProdutos.reduce((total, compra) => total + compra.quatidade, 0);
    const quantidadeServicos = comprasClienteServicos.reduce((total, compra) => total + compra.quatidade, 0);

    return quantidadeProdutos + quantidadeServicos;
};

// Função para calcular o consumo de produtos por raça e tipo
const calcularConsumoProdutosPorRacaTipo = (raca: string, tipo: string, comprasProdutos: CompraProduto[]): number => {
    const comprasProdutosFiltradas = comprasProdutos.filter(compra => compra.raca === raca && compra.tipo === tipo);
    return comprasProdutosFiltradas.reduce((total, compra) => total + compra.quatidade, 0);
};

// Função para calcular o consumo de serviços por raça e tipo
const calcularConsumoServicosPorRacaTipo = (raca: string, tipo: string, comprasServicos: CompraServico[]): number => {
    const comprasServicosFiltradas = comprasServicos.filter(compra => compra.raca === raca && compra.tipo === tipo);
    return comprasServicosFiltradas.reduce((total, compra) => total + compra.quatidade, 0);
};

// Ordenar clientes por valor gasto
const listaClientesPorValorGasto = (clientes: Cliente[], produtos: Produto[], servicos: Servico[], comprasProdutos: CompraProduto[], comprasServicos: CompraServico[]): ClienteValor[] => {
    return clientes
        .map(cliente => ({
            cliente,
            valorGasto: calcularValorGastoCliente(cliente, produtos, servicos, comprasProdutos, comprasServicos),
        }))
        .sort((a, b) => b.valorGasto - a.valorGasto);
};

// Ordenar clientes por consumo total
const listaClientesPorConsumoTotal = (clientes: Cliente[], comprasProdutos: CompraProduto[], comprasServicos: CompraServico[]): ClienteConsumo[] => {
    return clientes
        .map(cliente => ({
            cliente,
            consumo: calcularConsumoCliente(cliente, comprasProdutos, comprasServicos),
        }))
        .sort((a, b) => b.consumo - a.consumo);
};

// Lista de consumo de produtos
const listaConsumoProdutos = (produtos: Produto[], comprasProdutos: CompraProduto[]): ProdutoConsumo[] => {
    return produtos
        .map(produto => ({
            produto: produto,
            valorGasto: comprasProdutos.filter(compra => compra.produto_id === produto.id).reduce((total, compra) => total + compra.quatidade, 0),
        }))
        .sort((a, b) => b.valorGasto - a.valorGasto);
};

// Lista de consumo de serviços
const listaConsumoServicos = (servicos: Servico[], comprasServicos: CompraServico[]): ServicoConsumo[] => {
    return servicos
        .map(servico => ({
            servico: servico,
            valorGasto: comprasServicos.filter(compra => compra.servico_id === servico.id).reduce((total, compra) => total + compra.quatidade, 0),
        }))
        .sort((a, b) => b.valorGasto - a.valorGasto);
};

// Função para criar a lista de RacaTipoItem
const criarListaRacaTipoItem = (
    comprasProdutos: CompraProduto[],
    comprasServicos: CompraServico[],
    produtos: Produto[],
    servicos: Servico[]
): RacaTipoItem[] => {
    const racaTipoProdutos: RacaTipoItem[] = [];

    // Criar uma lista única de raças e tipos presentes nas compras de produtos
    const racasTiposProdutos = Array.from(new Set(comprasProdutos.map(compra => ({ raca: compra.raca, tipo: compra.tipo }))));

    // Criar uma lista única de raças e tipos presentes nas compras de serviços
    const racasTiposServicos = Array.from(new Set(comprasServicos.map(compra => ({ raca: compra.raca, tipo: compra.tipo }))));

    // Unir as listas de raças e tipos de produtos e serviços, removendo duplicatas
    const racaTipoComDuplicata = Array.from(new Set([...racasTiposProdutos, ...racasTiposServicos]));

    const racasTiposUnicas = new Array<{raca:string, tipo:string}>()

    // Para cada raça e tipo único, criar um objeto RacaTipoItem
    racasTiposUnicas.forEach(({ raca, tipo }) => {
        const servicoConsumo: ServicoConsumo[] = servicos.map(servico => ({
            servico: servico,
            valorGasto: calcularConsumoServicosPorRacaTipo(raca, tipo, comprasServicos),
        }));

        const produtoConsumo: ProdutoConsumo[] = produtos.map(produto => ({
            produto: produto,
            valorGasto: calcularConsumoProdutosPorRacaTipo(raca, tipo, comprasProdutos),
        }));

        racaTipoProdutos.push({
            raca,
            tipo,
            servicoConsumo,
            produtoConsumo,
        });
    });

    return racaTipoProdutos;
};






const Listagem = () => {

    const [clientes, setClientes] = useState<Cliente[]>(new Array<Cliente>())
    const [produtos, setProdutos] = useState<Produto[]>(new Array<Produto>())
    const [servicos, setServicos] = useState<Servico[]>(new Array<Servico>())
    const [comprasProdutos, setComprasProdutos] = useState(new Array<CompraProduto>())
    const [comprasServicos, setComprasServicos] = useState(new Array<CompraServico>())
    const [clientesPorValorGasto, setClientesPorValorGasto] = useState<ClienteValor[]>()
    const [clientesPorConsumoTotal, setClientesPorConsumoTotal] = useState<ClienteConsumo[]>()
    const [consumoProdutos, setConsumoProdutos] = useState<ProdutoConsumo[]>()
    const [consumoServicos, setConsumoServicos] = useState<ServicoConsumo[]>()
    const [consumoItemPorRacaTipo, setConsumoItemPorRacaTipo] = useState<RacaTipoItem[]>()


    useEffect(() => {
        (async () => {
            setClientes(await getAllClientes())
            setProdutos(await getAllProdutos())
            setServicos(await getAllServicos())
            setComprasProdutos(await getAllCompraProduto())
            setComprasServicos(await getAllCompraServico())

        })()

        return () => {

        }
    }, [])

    useEffect(() => {

        setClientesPorValorGasto(listaClientesPorValorGasto(clientes, produtos, servicos, comprasProdutos, comprasServicos))
        setClientesPorConsumoTotal(listaClientesPorConsumoTotal(clientes, comprasProdutos, comprasServicos))
        setConsumoProdutos(listaConsumoProdutos(produtos, comprasProdutos))
        setConsumoServicos(listaConsumoServicos(servicos, comprasServicos))
        setConsumoItemPorRacaTipo(criarListaRacaTipoItem(comprasProdutos, comprasServicos, produtos, servicos))

    }, [clientes, produtos, servicos, comprasProdutos, comprasServicos, servicos])


    return (
        <Box p={'1rem 0'}>
            <Box
                marginBottom={'1rem'}
                bgColor={'rgba(167, 151, 176, 0.31)'}
                p={'0.8rem'}
                mx={'1rem'}
                borderRadius={'1rem'}
                textColor={'rgba(17, 0, 26, 0.89)'}
            >

                <OrderedList>
                    <ListItem>Lista de cliente por valor gasto</ListItem>
                    <ListItem>Lista de cliente por consumo total</ListItem>
                    <ListItem>Lista de consumo de produtos</ListItem>
                    <ListItem>Lista de consumo de serviços</ListItem>
                    <ListItem>Lista de consumo de produtos por raça e tipo</ListItem>
                    <ListItem>Lista de consumo de serviços por raça e tipo</ListItem>
                </OrderedList>
            </Box>
            <Tabs isFitted variant='enclosed'>
                <TabList mb='1em'>
                    <Tab>1</Tab>
                    <Tab>2</Tab>
                    <Tab>3</Tab>
                    <Tab>4</Tab>
                    <Tab>5</Tab>
                    <Tab>6</Tab>
                </TabList>
                <TabPanels>
                    {/* Cliente por Valor */}
                    <TabPanel p={'0.5rem'}
                        width={'100%'}
                    >
                        <OrderedList pl={'0'}>
                            {clientesPorValorGasto !== undefined && clientesPorValorGasto.map(clienteValor => {
                                return (
                                    <Box
                                        marginBottom={'1rem'}
                                        bgColor={'rgba(167, 151, 176, 0.31)'}
                                        p={'1rem'}
                                        borderRadius={'1rem'}
                                        textColor={'rgba(17, 0, 26, 0.89)'}
                                        key={clienteValor.cliente.id}
                                    >
                                        <ListItem
                                            ml={'0.5rem'}
                                        ><h5>{clienteValor.cliente.nome}</h5></ListItem>
                                        Valor Gasto: R${clienteValor.valorGasto}
                                    </Box>
                                )
                            })}
                        </OrderedList>
                    </TabPanel>
                    {/* Cliente por Consumo */}
                    <TabPanel p={'0.5rem'}
                        width={'100%'}
                    >
                        <OrderedList pl={'0'}>
                            {clientesPorConsumoTotal !== undefined && clientesPorConsumoTotal.map(clienteConsumo => {
                                return (
                                    <Box
                                        marginBottom={'1rem'}
                                        bgColor={'rgba(167, 151, 176, 0.31)'}
                                        p={'1rem'}
                                        borderRadius={'1rem'}
                                        textColor={'rgba(17, 0, 26, 0.89)'}
                                    >
                                        <ListItem
                                            ml={'0.5rem'}
                                        ><h5>{clienteConsumo.cliente.nome}</h5></ListItem>
                                        Quantidade de consumo: {clienteConsumo.consumo}
                                    </Box>
                                )
                            })}
                        </OrderedList>
                    </TabPanel>
                    {/* Consumo Produto */}
                    <TabPanel>
                        <Flex
                            flexDirection={'row'}
                            flexWrap={'wrap'}
                            gap={'1rem'}
                        >
                            {consumoProdutos!==undefined && consumoProdutos.map(consumoProduto=>{
                                return(
                                    <CardConsumoProduto consumoProduto={consumoProduto} />
                                )
                            })}
                        </Flex>
                    </TabPanel>
                    {/* Consumo Serviços */}
                    <TabPanel>
                        <Flex
                            flexDirection={'row'}
                            flexWrap={'wrap'}
                            gap={'1rem'}
                        >
                            {consumoServicos!==undefined && consumoServicos.map(consumoServico=>{
                                return(
                                    <CardConsumoServico consumoServico={consumoServico} />
                                )
                            })}

                        </Flex>
                    </TabPanel>
                    {/* Raça-Tipo Produto */}
                    <TabPanel>
                        <Flex
                            flexDirection={'row'}
                            flexWrap={'wrap'}
                            gap={'1rem'}
                        >
                            {consumoItemPorRacaTipo!==undefined && consumoItemPorRacaTipo.map(consumoProdutoPorRacaTipo=>{
                                return(
                                    <CardRacaTipoProduto consumoProdutoPorRacaTipo={consumoProdutoPorRacaTipo}  key={consumoProdutoPorRacaTipo.raca+consumoProdutoPorRacaTipo.tipo}/>
                                )
                            })}
                            
                        </Flex>
                    </TabPanel>
                    {/* Raça-Tipo Serviço */}
                    <TabPanel>
                        <Flex
                            flexDirection={'row'}
                            flexWrap={'wrap'}
                            gap={'1rem'}
                        >
                            
                            {consumoItemPorRacaTipo!==undefined && consumoItemPorRacaTipo.map(consumoServicosPorRacaTipo=>{
                                return(
                                    <CardRacaTipoServico consumoServicosPorRacaTipo={consumoServicosPorRacaTipo} key={consumoServicosPorRacaTipo.raca+consumoServicosPorRacaTipo.tipo} />
                                )
                            })}
                        </Flex>
                    </TabPanel>
                </TabPanels>
            </Tabs>

        </Box>
    )
}

export default Listagem