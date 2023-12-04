import { Card, CardHeader, Heading, CardBody, Box, ListItem, OrderedList } from "@chakra-ui/react"
import { RacaTipoItem } from "./Listagem"

type props = {
    consumoProdutoPorRacaTipo: RacaTipoItem
}

const CardRacaTipoProduto: React.FC<props> = ({ consumoProdutoPorRacaTipo }) => {
    return (
        <Card
            bgColor={'rgba(160, 54, 217, 0.87);'}
            textColor={'white'}
        >
            <CardHeader>
                <Heading size='md'>Raça: {consumoProdutoPorRacaTipo.raca}</Heading>
                <Heading size='md'>Tipo: {consumoProdutoPorRacaTipo.tipo}</Heading>
            </CardHeader>
            <CardBody>
                <OrderedList pl={'0'}>
                    {consumoProdutoPorRacaTipo.produtoConsumo.map(consumoProduto => {
                        return (
                            <Box
                                marginBottom={'1rem'}
                                bgColor={'rgba(167, 151, 176, 0.31)'}
                                p={'1rem'}
                                borderRadius={'1rem'}
                                textColor={'white'}
                            >
                                <ListItem
                                    ml={'0.5rem'}
                                ><h5>{consumoProduto.produto.nome}</h5></ListItem>
                                Quantidade de consumo: {consumoProduto.valorGasto}
                            </Box>
                        )
                    })}

                </OrderedList>
            </CardBody>
        </Card>
    )
}
export default CardRacaTipoProduto
