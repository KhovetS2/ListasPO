import { Button, Box, Modal, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormLabel, Select, ModalFooter, ModalOverlay, useDisclosure, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, MenuItem } from "@chakra-ui/react"
import { useState } from "react"


const RealzarCompraModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [tipoCompra, setTipoCompra] = useState('')
    const OverlayOne = () => (
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(10px) hue-rotate(90deg)'
        />
    )
    return (
        <>
            <MenuItem onClick={onOpen}>Realizar Compra de Itens</MenuItem>
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                <OverlayOne />

                <ModalContent>
                    <ModalHeader>Realizar Compra</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box mb={'1rem'}>
                            <FormLabel>Tipo da Compra</FormLabel>
                            <Select placeholder='Selecione o que vai comprar'
                                value={tipoCompra}
                                onChange={(e) => { setTipoCompra(e.target.value) }}
                            >
                                <option value='Produto'>Produto</option>
                                <option value='Serviço'>Serviço</option>
                            </Select>
                        </Box>
                        <Box mb={'1rem'}>
                            <FormLabel>Tipo da Compra</FormLabel>
                            <Select placeholder={`Selecione o ${tipoCompra} vai comprar`}
                            >
                                {tipoCompra === "Produto" && (
                                    <>
                                        <option value='Produto'>Produto 1</option>
                                        <option value='Produto'>Produto 2</option>
                                        <option value='Produto'>Produto 3</option>
                                        <option value='Produto'>Produto 4</option>
                                        <option value='Produto'>Produto 5</option>
                                    </>
                                )}
                                {tipoCompra === "Serviço" && (
                                    <>
                                        <option value='Serviço'>Serviço 1</option>
                                        <option value='Serviço'>Serviço 2</option>
                                        <option value='Serviço'>Serviço 3</option>
                                        <option value='Serviço'>Serviço 4</option>
                                        <option value='Serviço'>Serviço 5</option>
                                    </>
                                )}
                            </Select>
                        </Box>
                        <Box>
                        <FormLabel>Quantidade</FormLabel>
                        <NumberInput defaultValue={1} min={1}>
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                        </Box>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose} mr={'0.5rem'} colorScheme="green">Comprar</Button>
                        <Button onClick={onClose}>Fechar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default RealzarCompraModal