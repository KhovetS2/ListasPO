import { Box, Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, useToast } from "@chakra-ui/react"
import { useState } from "react";

const FormularioCadastroServiço = () => {
    const [nome, setNome] = useState("");
    const [valor, setValor] = useState(0)
    const toast = useToast()
    
    const cadastrarServico = async (e: React.MouseEvent) => {
        e.preventDefault()
        const body = {
            nome,
            valor
        }
        const response = fetch('http://localhost:8000/servico/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
        toast.promise(response, {
            success: { title: 'Serviço Criado', description: 'Serviço criado com sucesso' },
            error: { title: 'Erro ao Criar Serviço', description: 'Ocorreu um erro ao criar o serviço' },
            loading: { title: 'Criando Serviço', description: 'Por favor, espere' },
          })
        setValor(0.0)
        setNome('')
    }
    return (
        <Box>
            <FormControl mb="1rem" isInvalid={nome.trim() === ""}>
                <FormLabel>Nome</FormLabel>
                <Input value={nome} onChange={(e) => setNome(e.target.value)} />
                {nome.trim() === "" ? (
                    <FormErrorMessage>Nome é obrigatório.</FormErrorMessage>
                ) : (
                    <FormHelperText>Informe o nome.</FormHelperText>
                )}
            </FormControl>
            <Box mb={'1rem'}>
                <FormLabel>Valor</FormLabel>
                <NumberInput defaultValue={0} precision={2} step={0.2}>
                    <NumberInputField value={valor} onChange={e => {
                        console.log(e.target.value);
                        setValor(Number.parseFloat(e.target.value))
                    }} />
                    <NumberInputStepper>
                        <NumberIncrementStepper onClick={e => setValor(valor+0.2)} />
                        <NumberDecrementStepper onClick={e => setValor(valor-0.2)}  />
                    </NumberInputStepper>
                </NumberInput>
            </Box>
            <Button mr={'0.5rem'} colorScheme="green" onClick={cadastrarServico}>Cadastrar</Button>
        </Box>
    )
}

export default FormularioCadastroServiço