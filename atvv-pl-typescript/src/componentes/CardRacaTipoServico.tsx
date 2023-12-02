import { Card, CardHeader, Heading, CardBody, Box, ListItem, OrderedList } from "@chakra-ui/react"

const CardRacaTipoServico = () => {
    return (
        <Card
            bgColor={'rgba(160, 54, 217, 0.87);'}
            textColor={'white'}
        >
            <CardHeader>
                <Heading size='md'>Raça: Poodle</Heading>
                <Heading size='md'>Tipo: Toy</Heading>
            </CardHeader>
            <CardBody>
                <OrderedList pl={'0'}>
                    <Box
                        marginBottom={'1rem'}
                        bgColor={'rgba(167, 151, 176, 0.31)'}
                        p={'1rem'}
                        borderRadius={'1rem'}
                        textColor={'white'}
                    >
                        <ListItem
                            ml={'0.5rem'}
                        ><h5>Serviço 1</h5></ListItem>
                        Quantidade de consumo: 250
                    </Box>
                    <Box
                        marginBottom={'1rem'}
                        bgColor={'rgba(167, 151, 176, 0.31)'}
                        p={'1rem'}
                        borderRadius={'1rem'}
                        textColor={'white'}
                    >
                        <ListItem
                            ml={'0.5rem'}
                        ><h5>Serviço Lorem</h5></ListItem>
                        Quantidade de consumo: 250
                    </Box>
                    <Box
                        marginBottom={'1rem'}
                        bgColor={'rgba(167, 151, 176, 0.31)'}
                        p={'1rem'}
                        borderRadius={'1rem'}
                        textColor={'white'}
                    >
                        <ListItem
                            ml={'0.5rem'}
                        ><h5>Serviço Ipsum</h5></ListItem>
                        Quantidade de consumo: 250
                    </Box>
                </OrderedList>
            </CardBody>
        </Card>
    )
}
export default CardRacaTipoServico
