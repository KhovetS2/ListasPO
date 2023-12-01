import { Box,  Flex,  ListItem, OrderedList, Tab, TabList, TabPanel, TabPanels, Tabs,  } from "@chakra-ui/react"
import CardConsumoServico from "./CardConsumoServico"
import CardConsumoProduto from "./CardConsumoProduto"
import CardRacaTipoProduto from "./CardRacaTipoProduto"
import CardRacaTipoServico from "./CardRacaTipoServico"

const Listagem = () => {

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
                            <Box
                                marginBottom={'1rem'}
                                bgColor={'rgba(167, 151, 176, 0.31)'}
                                p={'1rem'}
                                borderRadius={'1rem'}
                                textColor={'rgba(17, 0, 26, 0.89)'}
                            >
                                <ListItem
                                    ml={'0.5rem'}
                                ><h5>Cliente 1</h5></ListItem>
                                Valor Gasto: R$1000,00
                            </Box>
                            <Box
                                marginBottom={'1rem'}
                                bgColor={'rgba(167, 151, 176, 0.31)'}
                                p={'1rem'}
                                borderRadius={'1rem'}
                                textColor={'rgba(17, 0, 26, 0.89)'}
                            >
                                <ListItem
                                    ml={'0.5rem'}
                                ><h5>Cliente 2</h5></ListItem>
                                Valor Gasto: R$1000,00
                            </Box>
                            <Box
                                marginBottom={'1rem'}
                                bgColor={'rgba(167, 151, 176, 0.31)'}
                                p={'1rem'}
                                borderRadius={'1rem'}
                                textColor={'rgba(17, 0, 26, 0.89)'}
                            >
                                <ListItem
                                    ml={'0.5rem'}
                                ><h5>Cliente 3</h5></ListItem>
                                Valor Gasto: R$1000,00
                            </Box>
                            <Box
                                marginBottom={'1rem'}
                                bgColor={'rgba(167, 151, 176, 0.31)'}
                                p={'1rem'}
                                borderRadius={'1rem'}
                                textColor={'rgba(17, 0, 26, 0.89)'}
                            >
                                <ListItem
                                    ml={'0.5rem'}
                                ><h5>Cliente Lorem</h5></ListItem>
                                Valor Gasto: R$1000,00
                            </Box>
                            <Box
                                marginBottom={'1rem'}
                                bgColor={'rgba(167, 151, 176, 0.31)'}
                                p={'1rem'}
                                borderRadius={'1rem'}
                                textColor={'rgba(17, 0, 26, 0.89)'}
                            >
                                <ListItem
                                    ml={'0.5rem'}
                                ><h5>Cliente Ipsum</h5></ListItem>
                                Valor Gasto: R$1000,00
                            </Box>

                        </OrderedList>
                    </TabPanel>
                    {/* Cliente por Consumo */}
                    <TabPanel p={'0.5rem'}
                        width={'100%'}
                    >
                        <OrderedList pl={'0'}>
                            <Box
                                marginBottom={'1rem'}
                                bgColor={'rgba(167, 151, 176, 0.31)'}
                                p={'1rem'}
                                borderRadius={'1rem'}
                                textColor={'rgba(17, 0, 26, 0.89)'}
                            >
                                <ListItem
                                    ml={'0.5rem'}
                                ><h5>Cliente 1</h5></ListItem>
                                Quantidade de consumo: 250
                            </Box>
                            <Box
                                marginBottom={'1rem'}
                                bgColor={'rgba(167, 151, 176, 0.31)'}
                                p={'1rem'}
                                borderRadius={'1rem'}
                                textColor={'rgba(17, 0, 26, 0.89)'}
                            >
                                <ListItem
                                    ml={'0.5rem'}
                                ><h5>Cliente Lorem</h5></ListItem>
                                Quantidade de consumo: 250
                            </Box>
                            <Box
                                marginBottom={'1rem'}
                                bgColor={'rgba(167, 151, 176, 0.31)'}
                                p={'1rem'}
                                borderRadius={'1rem'}
                                textColor={'rgba(17, 0, 26, 0.89)'}
                            >
                                <ListItem
                                    ml={'0.5rem'}
                                ><h5>Cliente Ipsum</h5></ListItem>
                                Quantidade de consumo: 250
                            </Box>
                        </OrderedList>
                    </TabPanel>
                    {/* Consumo Produto */}
                    <TabPanel>
                        <Flex
                            flexDirection={'row'}
                            flexWrap={'wrap'}
                            gap={'1rem'}
                        >
                            <CardConsumoProduto />
                            <CardConsumoProduto />
                            <CardConsumoProduto />
                            <CardConsumoProduto />
                            <CardConsumoProduto />
                        </Flex>
                    </TabPanel>
                    {/* Consumo Serviços */}
                    <TabPanel>
                        <Flex
                            flexDirection={'row'}
                            flexWrap={'wrap'}
                            gap={'1rem'}
                        >
                            <CardConsumoServico />
                            <CardConsumoServico />
                            <CardConsumoServico />
                            <CardConsumoServico />
                            <CardConsumoServico /> 
                        </Flex>
                    </TabPanel>
                    {/* Raça-Tipo Produto */}
                    <TabPanel>
                        <Flex
                            flexDirection={'row'}
                            flexWrap={'wrap'}
                            gap={'1rem'}
                        >
                            <CardRacaTipoProduto />
                            <CardRacaTipoProduto />
                            <CardRacaTipoProduto />
                        </Flex>
                    </TabPanel>
                    {/* Raça-Tipo Serviço */}
                    <TabPanel>
                        <Flex
                            flexDirection={'row'}
                            flexWrap={'wrap'}
                            gap={'1rem'}
                        >
                            <CardRacaTipoServico />
                            <CardRacaTipoServico />
                            <CardRacaTipoServico />
                        </Flex>
                    </TabPanel>
                </TabPanels>
            </Tabs>

        </Box>
    )
}

export default Listagem