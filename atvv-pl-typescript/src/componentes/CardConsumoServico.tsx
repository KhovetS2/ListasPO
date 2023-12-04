import { Card, CardHeader, Heading, CardBody, CardFooter, Button, Text } from "@chakra-ui/react"
import EditarServico from "./EditarServico"
import { ServicoConsumo } from "./Listagem"
import React from "react"

type props = {
    consumoServico: ServicoConsumo
}

const CardConsumoServico: React.FC<props> = ({consumoServico}) => {
    return (
        <Card
            bgColor={'rgba(160, 54, 217, 0.87);'}
            textColor={'white'}
        >
            <CardHeader>
                <Heading size='md'>{consumoServico.servico.nome}</Heading>
            </CardHeader>
            <CardBody>
                <Text>Valor: R${consumoServico.servico.valor}</Text>
                <Text>Consumo: {consumoServico.valorGasto}</Text>
            </CardBody>
            <CardFooter gap={'1rem'}>
                <EditarServico />
                <Button colorScheme="red">Deletar Serviço</Button>
            </CardFooter>
        </Card>
    )
}
export default CardConsumoServico