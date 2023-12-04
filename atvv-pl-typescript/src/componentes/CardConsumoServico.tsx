import { Card, CardHeader, Heading, CardBody, CardFooter, Button, Text } from "@chakra-ui/react"
import EditarServico from "./EditarServico"
import { ServicoConsumo } from "./Listagem"
import React from "react"
import { Servico } from "../models/Servico"

type props = {
    consumoServico: ServicoConsumo
    update: Function
}

const CardConsumoServico: React.FC<props> = ({consumoServico, update}) => {

    const deletarServico = async (e: React.MouseEvent, servico: Servico) => {
        e.preventDefault()
        const request = await fetch(`http://localhost:8000/servico/${servico.id}`, {
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
                <Heading size='md'>{consumoServico.servico.nome}</Heading>
            </CardHeader>
            <CardBody>
                <Text>Valor: R${consumoServico.servico.valor}</Text>
                <Text>Consumo: {consumoServico.valorGasto}</Text>
            </CardBody>
            <CardFooter gap={'1rem'}>
                <EditarServico servico={consumoServico.servico} update={update} />
                <Button colorScheme="red" onClick={(e)=>{
                    deletarServico(e, consumoServico.servico)
                }}>Deletar Serviço</Button>
            </CardFooter>
        </Card>
    )
}
export default CardConsumoServico