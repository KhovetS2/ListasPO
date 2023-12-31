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
const VisualizacaoCliente: React.FC = () => {




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
                <h2>Cliente Lorem</h2>
                <h5>Loremzin</h5>
                <h6>lorem@lorem.com</h6>
            </Box>
            <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                    Ações
                </MenuButton>
                <MenuList>
                    <EditarCliente />
                    <MenuItem>Deletar Cliente</MenuItem>
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
            Avenida Cesare Monsueto Giulio Lattes, 1350 Distrito - Eugênio de Melo, São José dos Campos - SP, 12247-014
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
                <Tag size={'lg'} colorScheme='cyan'>
                    <TagLeftIcon boxSize='12px' as={PhoneIcon} />
                    <TagLabel>(24)999990000</TagLabel>
                </Tag>
                <Tag size={'lg'} colorScheme='cyan'>
                    <TagLeftIcon boxSize='12px' as={PhoneIcon} />
                    <TagLabel>(24)999990000</TagLabel>
                </Tag>
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
                <PetsAccordion />
                <AdicionarPet />
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