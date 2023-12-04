import { Button, Box, Modal, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormLabel, Input, ModalFooter, ModalOverlay, useDisclosure, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, FormControl, FormErrorMessage, FormHelperText, useToast } from "@chakra-ui/react"
import { useState } from "react";
import { Servico } from "../models/Servico";

type props = {
    servico: Servico
    update: Function
}
const EditarServico:React.FC<props> = ({servico, update}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const OverlayOne = () => (
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(10px) hue-rotate(90deg)'
        />
    )
    const [nome, setNome] = useState(servico.nome);
    const [valor, setValor] = useState(servico.valor)
    const toast = useToast()

    const editarServico = async (e: React.MouseEvent) => {
        e.preventDefault()
        const body = {
            id:servico.id,
            nome,
            valor
        }
        const response = fetch('http://localhost:8000/servico/', {
            method: 'PUT',
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
        update()
        onClose()
    }

    return (
        <>
            <Button onClick={onOpen}>Editar Serviço</Button>
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                <OverlayOne />

                <ModalContent>
                    <ModalHeader>Editar Servico</ModalHeader>
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
                        <Button onClick={editarServico} mr={'0.5rem'} colorScheme="green">Editar</Button>
                        <Button onClick={onClose}>Fechar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default EditarServico