import { Button, Box, Modal, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormLabel, Input, ModalFooter, ModalOverlay, useDisclosure, MenuItem } from "@chakra-ui/react"


const EditarPet = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const OverlayOne = () => (
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(10px) hue-rotate(90deg)'
        />
    )
    return (
        <>
            <MenuItem onClick={onOpen}>Editar Pet</MenuItem>
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                <OverlayOne />

                <ModalContent>
                    <ModalHeader>Editar Pet</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box mb={'1rem'}>
                            <FormLabel>Nome</FormLabel>
                            <Input value={'Adebaldo'} />
                        </Box>
                        <Box mb={'1rem'}>
                            <FormLabel>Tipo</FormLabel>
                            <Input value={'Toy'} />
                        </Box>
                        <Box mb={'1rem'}>
                            <FormLabel>Raça</FormLabel>
                            <Input value={'Poodle'} />
                        </Box>
                        <Box mb={'1rem'}>
                            <FormLabel>Gênero</FormLabel>
                            <Input value={'Masculno'} />
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

export default EditarPet