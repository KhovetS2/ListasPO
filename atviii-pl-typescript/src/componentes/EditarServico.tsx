import { Button, Box, Modal, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormLabel,  Input, ModalFooter, ModalOverlay, useDisclosure, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from "@chakra-ui/react"


const EditarServico = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const OverlayOne = () => (
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(10px) hue-rotate(90deg)'
        />
    )
    return (
        <>
            <Button onClick={onOpen}>Editar Serviço</Button>
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                <OverlayOne />

                <ModalContent>
                    <ModalHeader>Editar Servico</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box mb={'1rem'}>
                            <FormLabel>Nome</FormLabel>
                            <Input value={'Tosa'} />
                        </Box>
                        <Box mb={'1rem'}>
                            <FormLabel>Valor</FormLabel>
                            <NumberInput defaultValue={15} precision={2} step={0.2}>
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </Box>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose} mr={'0.5rem'} colorScheme="green">Editar</Button>
                        <Button onClick={onClose}>Fechar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default EditarServico