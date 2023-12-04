import { Button, Box, Modal, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormLabel, Input, ModalFooter, ModalOverlay, useDisclosure, FormControl, FormErrorMessage, FormHelperText, } from "@chakra-ui/react"
import React, { useState } from "react";


const AdicionarPet:React.FC<{cliente_id:number}> = ({cliente_id}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [nome, setNome] = useState("");
    const [tipo, setTipo] = useState("");
    const [raca, setRaca] = useState("");
    const [genero, setGenero] = useState("");

    const OverlayOne = () => (
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(10px) hue-rotate(90deg)'
        />
    )
    const cadastrarPet =async (e: React.MouseEvent) => {
        e.preventDefault()
        if (nome.trim() === "" ||
            tipo.trim() === "" ||
            raca.trim() === "" ||
            genero.trim() === "" 
        ) {
            alert("Preencha todos os campos obrigatórios.");
            return;
        }
        const body = {
            nome,
            tipo,
            raca,
            genero,
            cliente_id
        }
        const response = await fetch('http://localhost:8000/pet/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
    }

    return (
        <>
            <Button colorScheme='purple' onClick={onOpen}>Adicionar Pet</Button>
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                <OverlayOne />

                <ModalContent>
                    <ModalHeader>Adicionar Pet</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl mb="1rem" isInvalid={nome.trim() === ""}>
                            <FormLabel>Nome</FormLabel>
                            <Input value={nome} onChange={(e)=>setNome(e.target.value)} />
                            {nome.trim() === "" ? (
                                <FormErrorMessage>Nome é obrigatório.</FormErrorMessage>
                            ) : (
                                <FormHelperText>Informe o nome.</FormHelperText>
                            )}
                        </FormControl>

                        <FormControl mb="1rem" isInvalid={tipo.trim() === ""}>
                            <FormLabel>Tipo</FormLabel>
                            <Input value={tipo} onChange={(e)=>setTipo(e.target.value)} />
                            {tipo.trim() === "" ? (
                                <FormErrorMessage>Tipo é obrigatório.</FormErrorMessage>
                            ) : (
                                <FormHelperText>Informe o tipo.</FormHelperText>
                            )}
                        </FormControl>

                        <FormControl mb="1rem" isInvalid={raca.trim() === ""}>
                            <FormLabel>Raça</FormLabel>
                            <Input value={raca} onChange={(e)=>setRaca(e.target.value)} />
                            {raca.trim() === "" ? (
                                <FormErrorMessage>Raça é obrigatória.</FormErrorMessage>
                            ) : (
                                <FormHelperText>Informe a raça.</FormHelperText>
                            )}
                        </FormControl>

                        <FormControl mb="1rem" isInvalid={genero.trim() === ""}>
                            <FormLabel>Gênero</FormLabel>
                            <Input value={genero} onChange={(e)=>setGenero(e.target.value)} />
                            {genero.trim() === "" ? (
                                <FormErrorMessage>Gênero é obrigatório.</FormErrorMessage>
                            ) : (
                                <FormHelperText>Informe o gênero.</FormHelperText>
                            )}
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={cadastrarPet} mr={'0.5rem'} colorScheme="green">Adicionar</Button>
                        <Button onClick={onClose}>Fechar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default AdicionarPet