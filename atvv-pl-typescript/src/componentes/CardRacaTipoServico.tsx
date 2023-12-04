import { Card, CardHeader, Heading, CardBody, Box, ListItem, OrderedList } from "@chakra-ui/react"
import { RacaTipoItem } from "./Listagem"

type props = {
    consumoServicosPorRacaTipo: RacaTipoItem
}

const CardRacaTipoServico: React.FC<props> = ({ consumoServicosPorRacaTipo }) => {
    return (
        <Card
            bgColor={'rgba(160, 54, 217, 0.87);'}
            textColor={'white'}
        >
            <CardHeader>
                <Heading size='md'>Raça: {consumoServicosPorRacaTipo.raca}</Heading>
                <Heading size='md'>Tipo: {consumoServicosPorRacaTipo.tipo}</Heading>
            </CardHeader>
            <CardBody>
                <OrderedList pl={'0'}>
                    {consumoServicosPorRacaTipo.servicoConsumo.map(servicoConsumo => {
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
                                ><h5>{servicoConsumo.servico.nome}</h5></ListItem>
                                Quantidade de consumo: {servicoConsumo.valorGasto}
                            </Box>
                        )
                    })}
                    
                </OrderedList>
            </CardBody>
        </Card>
    )
}
export default CardRacaTipoServico
