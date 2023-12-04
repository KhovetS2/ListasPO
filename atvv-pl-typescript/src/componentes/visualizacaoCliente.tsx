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

type props = {
    cliente: Cliente | undefined
    selectView: Function;
    atualizarCliente: Function
}
const VisualizacaoCliente: React.FC<props> = ({cliente, selectView, atualizarCliente}) => {


    const deletarCliente = async (e:React.MouseEvent) => {
        e.preventDefault()
        const request = await fetch(`http://localhost:8000/clientes/${cliente?.id}`,{
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        selectView('Clientes', e)
    }

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
                    {cliente!==undefined && <EditarCliente cliente={cliente} atualizarCliente={atualizarCliente} />}
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
            {cliente?.endereco[0] !==undefined && cliente.endereco!==undefined && cliente?.endereco[0].rua}, {cliente?.endereco[0] !==undefined && cliente.endereco!==undefined && cliente?.endereco[0].numero} {cliente?.endereco[0] !==undefined && cliente.endereco!==undefined && cliente?.endereco[0].bairro}, {cliente?.endereco[0] !==undefined && cliente.endereco!==undefined && cliente?.endereco[0].cidade} - {cliente?.endereco[0] !==undefined && cliente.endereco!==undefined && cliente?.endereco[0].estado}, {cliente?.endereco[0] !==undefined && cliente.endereco!==undefined && cliente?.endereco[0].codigoPostal} - {cliente?.endereco[0] !==undefined && cliente.endereco!==undefined && cliente?.endereco[0].informacoesAdicionais}
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
            {cliente?.telefones.map((telefone)=>{
                return(
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
                {cliente?.pets && <PetsAccordion pets={cliente.pets} />}
                {cliente!== undefined && <AdicionarPet cliente_id={cliente.id} />}
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
                            <Tr>
                                <Td>Produtos 1</Td>
                                <Td>Produto</Td>
                                <Td isNumeric>30</Td>
                            </Tr>
                            <Tr>
                                <Td>Serviço 1</Td>
                                <Td>Serviço</Td>
                                <Td isNumeric>30</Td>
                            </Tr>
                            <Tr>
                                <Td>Produtos 2</Td>
                                <Td>Produto</Td>
                                <Td isNumeric>30</Td>
                            </Tr>
                            <Tr>
                                <Td>Produtos 3</Td>
                                <Td>Produto</Td>
                                <Td isNumeric>30</Td>
                            </Tr>
                            <Tr>
                                <Td>Serviço 1</Td>
                                <Td>Serviço</Td>
                                <Td isNumeric>30</Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </TableContainer>
            </Center>
        </Box>
    </Box>
    )
}

export default VisualizacaoCliente