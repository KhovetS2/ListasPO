import { Button, Box, Modal, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormLabel, Input, ModalFooter, ModalOverlay, useDisclosure, } from "@chakra-ui/react"


const AdicionarPet = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const OverlayOne = () => (
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(10px) hue-rotate(90deg)'
        />
    )
    return (
        <>
            <Button colorScheme='purple' onClick={onOpen}>Adicionar Pet</Button>
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                <OverlayOne />

                <ModalContent>
                    <ModalHeader>Adicionar Pet</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box mb={'1rem'}>
                            <FormLabel>Nome</FormLabel>
                            <Input />
                        </Box>
                        <Box mb={'1rem'}>
                            <FormLabel>Tipo</FormLabel>
                            <Input />
                        </Box>
                        <Box mb={'1rem'}>
                            <FormLabel>Raça</FormLabel>
                            <Input />
                        </Box>
                        <Box mb={'1rem'}>
                            <FormLabel>Gênero</FormLabel>
                            <Input />
                        </Box>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose} mr={'0.5rem'} colorScheme="green">Adicionar</Button>
                        <Button onClick={onClose}>Fechar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default AdicionarPet