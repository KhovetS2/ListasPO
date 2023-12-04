import { Box, Stack } from "@chakra-ui/layout"
import {
    Button,
    Center,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Table,

    TableContainer,
    Tag,
    TagLabel,
    TagLeftIcon,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react'
import { ChevronDownIcon, PhoneIcon } from '@chakra-ui/icons'
import PetsAccordion from "./PetsAccordion"
import AdicionarPet from "./AdicionarPet"
import EditarCliente from "./EditarCliente"
import Cliente from "../models/Cliente"
import { useEffect, useState } from "react"
import Pet from "../models/Pet"
import { CompraProduto } from "../models/CompraProduto"
import { CompraServico } from "../models/CompraServico"
import { getAllCompraProdutoByClienteId, getAllCompraServicoByClienteId } from "../services/compra"
import { Produto } from "../models/Produto"
import { Servico } from "../models/Servico"
import { getAllProdutos } from "../services/produto"
import { getAllServicos } from "../services/servico"

type props = {
    cliente: Cliente | undefined
    selectView: Function;
    atualizarCliente: Function
}
const VisualizacaoCliente: React.FC<props> = ({ cliente, selectView, atualizarCliente }) => {


    const deletarCliente = async (e: React.MouseEvent) => {
        e.preventDefault()
        const request = await fetch(`http://localhost:8000/clientes/${cliente?.id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        selectView('Clientes', e)
    }
    const [pets, setPets] = useState(new Array<Pet>())
    const [compraProduto, setCompraProduto] = useState(new Array<CompraProduto>())
    const [compraServico, setCompraServico] = useState(new Array<CompraServico>())
    const [produtos, setProdutos] = useState(new Array<Produto>())
    const [servicos, setServicos] = useState(new Array<Servico>())
    useEffect(() => {

        if (cliente !== undefined && cliente.pets !== undefined && cliente.pets) {
            (async () => {
                setCompraProduto(await getAllCompraProdutoByClienteId(cliente.id))
                setCompraServico(await getAllCompraServicoByClienteId(cliente.id))
                setProdutos(await getAllProdutos())
                setServicos(await getAllServicos())
            })();
            setPets(cliente.pets)
        }

    }, [cliente])


    return (<Box p={'1rem'}>
        <Box
            marginBottom={'1rem'}
            bgColor={'rgba(167, 151, 176, 0.31)'}
            p={'0.8rem'}
            borderRadius={'1rem'}
            textAlign={'center'}
            textColor={'rgba(17, 0, 26, 0.89)'}
        >
            <Box>
                <h2>{cliente?.nome}</h2>
                <h5>{cliente?.nomeSocial}</h5>
                <h6>{cliente?.email}</h6>
            </Box>
            <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                    Ações
                </MenuButton>
                <MenuList>
                    {cliente !== undefined && <EditarCliente cliente={cliente} atualizarCliente={atualizarCliente} />}
                    <MenuItem onClick={deletarCliente}>Deletar Cliente</MenuItem>
                </MenuList>
            </Menu>
        </Box>
        <Box
            marginBottom={'1rem'}
            bgColor={'rgba(167, 151, 176, 0.31)'}
            p={'0.8rem'}
            borderRadius={'1rem'}
            textColor={'rgba(17, 0, 26, 0.89)'}
        >
            <h4>Endereço</h4>
            {cliente?.endereco[0] !== undefined && cliente.endereco !== undefined && cliente?.endereco[0].rua}, {cliente?.endereco[0] !== undefined && cliente.endereco !== undefined && cliente?.endereco[0].numero} {cliente?.endereco[0] !== undefined && cliente.endereco !== undefined && cliente?.endereco[0].bairro}, {cliente?.endereco[0] !== undefined && cliente.endereco !== undefined && cliente?.endereco[0].cidade} - {cliente?.endereco[0] !== undefined && cliente.endereco !== undefined && cliente?.endereco[0].estado}, {cliente?.endereco[0] !== undefined && cliente.endereco !== undefined && cliente?.endereco[0].codigoPostal} - {cliente?.endereco[0] !== undefined && cliente.endereco !== undefined && cliente?.endereco[0].informacoesAdicionais}
        </Box>
        <Box
            marginBottom={'1rem'}
            bgColor={'rgba(167, 151, 176, 0.31)'}
            p={'0.8rem'}
            borderRadius={'1rem'}
            textColor={'rgba(17, 0, 26, 0.89)'}
        >
            <h4>Telefones</h4>
            <Stack flexDirection={'row'}>
                {cliente?.telefones.map((telefone) => {
                    return (
                        <Tag size={'lg'} colorScheme='cyan' key={telefone.id}>
                            <TagLeftIcon boxSize='12px' as={PhoneIcon} />
                            <TagLabel>({telefone.ddd}){telefone.numero}</TagLabel>
                        </Tag>
                    )
                })}


            </Stack>
        </Box>
        <Box
            bgColor={'rgba(167, 151, 176, 0.31)'}
            p={'0.8rem'}
            borderRadius={'1rem'}
            marginBottom={'1rem'}
            textColor={'rgba(17, 0, 26, 0.89)'}
        ><h4>Pets</h4>
            <Center
                flexDirection={'column'}
            >
                {cliente?.pets && <PetsAccordion pets={pets} setPets={setPets} atualizarCliente={atualizarCliente} />}
                {cliente !== undefined && <AdicionarPet cliente_id={cliente.id} atualizarCliente={atualizarCliente} />}
            </Center>
        </Box>
        <Box
            bgColor={'rgba(167, 151, 176, 0.31)'}
            p={'0.8rem'}
            borderRadius={'1rem'}
            marginBottom={'1rem'}
            textColor={'rgba(17, 0, 26, 0.89)'}
        ><h4>Consumo</h4>
            <Center>
                <TableContainer
                    w={['22rem', '40rem', '70rem']}
                >
                    <Table
                        variant='striped'
                        colorScheme='blackAlpha'
                        bgColor={'gray'}
                        overflowX={'auto'}
                        borderRadius={'1rem'}
                        textColor={'white'}
                    >
                        <Thead>
                            <Tr>
                                <Th textColor={'white'}>Item</Th>
                                <Th textColor={'white'}>Tipo</Th>
                                <Th textColor={'white'} isNumeric>Quantidade</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {compraProduto.map(compra => {
                                const produto = produtos.filter(produto => produto.id === compra.produto_id)
                                return (
                                    <Tr>
                                        <Td>{produto.length !== 0 && produto[0].nome}</Td>
                                        <Td>Produto</Td>
                                        <Td isNumeric>{compra.quatidade}</Td>
                                    </Tr>
                                )
                            })}
                            {compraServico.map(compra => {
                                const servico = servicos.filter(servico => servico.id === compra.servico_id)
                                return (
                                    <Tr>
                                        <Td>{servico.length !== 0 && servico[0].nome}</Td>
                                        <Td>Serviço</Td>
                                        <Td isNumeric>{compra.quatidade}</Td>
                                    </Tr>
                                )
                            })}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Center>
        </Box>
    </Box>
    )
}

export default VisualizacaoCliente