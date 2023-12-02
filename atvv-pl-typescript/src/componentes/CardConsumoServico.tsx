import { Card, CardHeader, Heading, CardBody, CardFooter, Button, Text } from "@chakra-ui/react"
import EditarServico from "./EditarServico"

const CardConsumoServico = () => {
    return (
        <Card
            bgColor={'rgba(160, 54, 217, 0.87);'}
            textColor={'white'}
        >
            <CardHeader>
                <Heading size='md'>Serviço 1</Heading>
            </CardHeader>
            <CardBody>
                <Text>Valor: R$5,59</Text>
                <Text>Consumo: 40</Text>
            </CardBody>
            <CardFooter gap={'1rem'}>
                <EditarServico />
                <Button colorScheme="red">Deletar Serviço</Button>
            </CardFooter>
        </Card>
    )
}
export default CardConsumoServico