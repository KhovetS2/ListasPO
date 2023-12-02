import { Box, Button, FormLabel, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from "@chakra-ui/react"

const FormularioCadastroProduto = () => {
    return (
        <Box>
            <Box mb={'1rem'}>
                <FormLabel>Nome</FormLabel>
                <Input />
            </Box>
            <Box mb={'1rem'}>
                <FormLabel>Valor</FormLabel>
                <NumberInput defaultValue={0} precision={2} step={0.2}>
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </Box>
            <Button mr={'0.5rem'} colorScheme="green">Cadastrar</Button>
        </Box>
    )
}

export default FormularioCadastroProduto