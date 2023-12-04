import { Card, CardHeader, Heading, CardBody, CardFooter, Button, Text } from "@chakra-ui/react"
import EditarProduto from "./EditarProduto"
import { ProdutoConsumo } from "./Listagem"
import React from "react"
import { Produto } from "../models/Produto"

type props = {
    consumoProduto: ProdutoConsumo
    update: Function
}
const CardConsumoProduto: React.FC<props> = ({consumoProduto, update}) => {

    const deletarProduto = async (e: React.MouseEvent, produto: Produto) => {
        e.preventDefault()
        const request = await fetch(`http://localhost:8000/produto/${produto.id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        update()
    }


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
                <EditarProduto produto={consumoProduto.produto} update={update} />
                <Button colorScheme="red" onClick={(e)=>deletarProduto(e, consumoProduto.produto)}>Deletar Produto</Button>
            </CardFooter>
        </Card>
    )
}
export default CardConsumoProduto