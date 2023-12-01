import { Card, CardHeader, Heading, CardBody, CardFooter, Button, Text } from "@chakra-ui/react"
import EditarProduto from "./EditarProduto"

const CardConsumoProduto = () => {
    return (
        <Card
            bgColor={'rgba(160, 54, 217, 0.87);'}
            textColor={'white'}
        >
            <CardHeader>
                <Heading size='md'>Produto 1</Heading>
            </CardHeader>
            <CardBody>
                <Text>Valor: R$5,59</Text>
                <Text>Consumo: 40</Text>
            </CardBody>
            <CardFooter gap={'1rem'}>
                <EditarProduto />
                <Button colorScheme="red">Deletar Produto</Button>
            </CardFooter>
        </Card>
    )
}
export default CardConsumoProduto