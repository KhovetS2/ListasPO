import { Button, Box, Modal, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormLabel,  Input, ModalFooter, ModalOverlay, useDisclosure, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, FormControl, FormErrorMessage, FormHelperText, useToast } from "@chakra-ui/react"
import { Produto } from "../models/Produto"
import { useState } from "react"

type props = {
    produto: Produto
    update: Function
}
const EditarProduto:React.FC<props> = ({produto, update}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const OverlayOne = () => (
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(10px) hue-rotate(90deg)'
        />
    )
    const [nome, setNome] = useState(produto.nome);
    const [valor, setValor] = useState(produto.valor)
    const toast = useToast()

    const editarProduto = async (e: React.MouseEvent) => {
        e.preventDefault()
        const body = {
            id:produto.id,
            nome,
            valor
        }
        const response = fetch('http://localhost:8000/produto/', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
        toast.promise(response, {
            success: { title: 'Produto Editado', description: 'Produto editado com sucesso' },
            error: { title: 'Erro ao Criar Produto', description: 'Ocorreu um erro ao editar o produto' },
            loading: { title: 'Editando Produto', description: 'Por favor, espere' },
        })
        update()
        onClose()
    }

    return (
        <>
            <Button onClick={onOpen}>Editar Produto</Button>
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                <OverlayOne />

                <ModalContent>
                    <ModalHeader>Editar Produto</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
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
                                <NumberInput defaultValue={0} value={valor} precision={2} step={0.2}>
                                    <NumberInputField value={valor} onChange={e => {
                                        setValor(Number.parseFloat(e.target.value))
                                    }} />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper onClick={e => setValor(valor + 0.2)} />
                                        <NumberDecrementStepper onClick={e => setValor(valor - 0.2)} />
                                    </NumberInputStepper>
                                </NumberInput>
                            </Box>
                        </Box>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={editarProduto} mr={'0.5rem'} colorScheme="green">Editar</Button>
                        <Button onClick={onClose}>Fechar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default EditarProduto