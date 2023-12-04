import { Card, CardHeader, Heading, CardBody, CardFooter, Button, Text } from "@chakra-ui/react"
import EditarProduto from "./EditarProduto"
import { ProdutoConsumo } from "./Listagem"
import React from "react"

type props = {
    consumoProduto: ProdutoConsumo
}
const CardConsumoProduto: React.FC<props> = ({consumoProduto}) => {
    return (
        <Card
            bgColor={'rgba(160, 54, 217, 0.87);'}
            textColor={'white'}
        >
            <CardHeader>
                <Heading size='md'>{consumoProduto.produto.nome}</Heading>
            </CardHeader>
            <CardBody>
                <Text>Valor: R${consumoProduto.produto.valor}</Text>
                <Text>Consumo: {consumoProduto.valorGasto}</Text>
            </CardBody>
            <CardFooter gap={'1rem'}>
                <EditarProduto />
                <Button colorScheme="red">Deletar Produto</Button>
            </CardFooter>
        </Card>
    )
}
export default CardConsumoProduto