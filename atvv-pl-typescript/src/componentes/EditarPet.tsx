import { Button, Box, Modal, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormLabel, Input, ModalFooter, ModalOverlay, useDisclosure, FormControl, FormErrorMessage, FormHelperText, MenuItem, useToast, } from "@chakra-ui/react"
import React, { useState } from "react";
import Pet from "../models/Pet";

type props = { 
    pet: Pet, 
    index:number, 
    setPetsArray: React.Dispatch<React.SetStateAction<Pet[]>>, 
    petsArray: Pet[] 
}

const EditarPet: React.FC<props> = ({ pet , index, setPetsArray, petsArray}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [nome, setNome] = useState(pet.nome);
    const [tipo, setTipo] = useState(pet.tipo);
    const [raca, setRaca] = useState(pet.raca);
    const [genero, setGenero] = useState(pet.genero);
    const toast = useToast()

    const OverlayOne = () => (
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(10px) hue-rotate(90deg)'
        />
    )
    const cadastrarPet = async (e: React.MouseEvent) => {
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
            id: pet.id,
            cliente_id: pet.cliente_id,
            nome,
            tipo,
            raca,
            genero,
        }
        const response = fetch('http://localhost:8000/pet/', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })

        toast.promise(response, {
            success: { title: 'Alteração Realizada', description: 'Alteração realizada com sucesso' },
            error: { title: 'Erro ao alterar', description: 'Ocorreu um erro ao realizar alteração' },
            loading: { title: 'Alterando Pet', description: 'Por favor, espere' },
          })

        
        setPetsArray(petsArray.map((petMap, i)=>{
            if(index ===i){
                return body
            }
            return petMap
        }))
        onClose()
    }

    return (
        <>
            <MenuItem onClick={onOpen}>Editar Pet</MenuItem>
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                <OverlayOne />

                <ModalContent>
                    <ModalHeader>Editar Pet</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl mb="1rem" isInvalid={nome.trim() === ""}>
                            <FormLabel>Nome</FormLabel>
                            <Input value={nome} onChange={(e) => setNome(e.target.value)} />
                            {nome.trim() === "" ? (
                                <FormErrorMessage>Nome é obrigatório.</FormErrorMessage>
                            ) : (
                                <FormHelperText>Informe o nome.</FormHelperText>
                            )}
                        </FormControl>

                        <FormControl mb="1rem" isInvalid={tipo.trim() === ""}>
                            <FormLabel>Tipo</FormLabel>
                            <Input value={tipo} onChange={(e) => setTipo(e.target.value)} />
                            {tipo.trim() === "" ? (
                                <FormErrorMessage>Tipo é obrigatório.</FormErrorMessage>
                            ) : (
                                <FormHelperText>Informe o tipo.</FormHelperText>
                            )}
                        </FormControl>

                        <FormControl mb="1rem" isInvalid={raca.trim() === ""}>
                            <FormLabel>Raça</FormLabel>
                            <Input value={raca} onChange={(e) => setRaca(e.target.value)} />
                            {raca.trim() === "" ? (
                                <FormErrorMessage>Raça é obrigatória.</FormErrorMessage>
                            ) : (
                                <FormHelperText>Informe a raça.</FormHelperText>
                            )}
                        </FormControl>

                        <FormControl mb="1rem" isInvalid={genero.trim() === ""}>
                            <FormLabel>Gênero</FormLabel>
                            <Input value={genero} onChange={(e) => setGenero(e.target.value)} />
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

export default EditarPet