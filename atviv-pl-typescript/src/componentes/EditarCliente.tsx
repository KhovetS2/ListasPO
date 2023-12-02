import { Button, Box, Modal, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormLabel, Input, ModalFooter, ModalOverlay, useDisclosure, MenuItem, FormErrorMessage, InputGroup, Stack, IconButton } from "@chakra-ui/react"
import React, { useState } from "react"
import Cliente from "../models/Cliente"
import Telefone from "../models/Telefone"
import { AddIcon } from "@chakra-ui/icons"
import Endereco from "../models/Endereço"

type props = {
    cliente: Cliente
    atualizarCliente: Function
}


const EditarCliente: React.FC<props> = ({ cliente, atualizarCliente }) => {
    if (cliente.email === null) {
        cliente.email = ''
    }
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [nome, setNome] = useState<string>(cliente.nome);
    const [nomeSocial, setNomeSocial] = useState<string>(cliente.nomeSocial);
    const [email, setEmail] = useState<string>(cliente.email);
    const [telefones, setTelefones] = useState<Array<Telefone>>(cliente.telefones)
    const [endereco, setEndereco] = useState<Endereco>(cliente.endereco)
    const [isValid, setIsValid] = useState(true);
    const OverlayOne = () => (
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(10px) hue-rotate(90deg)'
        />
    )

    const handleChangeEmail = (event: any) => {
        const inputValue = event.target.value;
        setEmail(inputValue);
        setIsValid(inputValue.includes('@'));
    };

    const updateArrayTelefone = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        let novoArray = [...telefones]
        if (novoArray[index] !== undefined) {
            if (e.target.id === 'ddd') {
                novoArray[index].ddd = e.target.value

            } else {
                novoArray[index].numero = e.target.value
            }
            setTelefones(novoArray)
        }
    }

    const updateCliente = async (e: React.MouseEvent) => {
        e.preventDefault()
        let listaTelefonesArrumada = telefones.map(telefone => {
            if (telefone.id === 0) {
                return {
                    ddd: telefone.ddd,
                    numero: telefone.numero
                }
            }
            return telefone
        })
        let updatedCliente = {
            id: cliente.id,
            nome: nome,
            nomeSocial: nomeSocial,
            email: email,
            telefones: listaTelefonesArrumada,
            endereco: endereco
        }
        await fetch('http://localhost:32831/cliente/atualizar', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedCliente)
        }
        )
        atualizarCliente(cliente.id)
        onClose()
    }
    return (
        <>
            <MenuItem onClick={onOpen}>Editar Cliente</MenuItem>
            <Modal isCentered isOpen={isOpen} onClose={onClose} size={'lg'}>
                <OverlayOne />

                <ModalContent>
                    <ModalHeader>Editar Cliente</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div className="container-fluid">
                            <form>
                                <div className="input-group mb-3">
                                    <Input
                                        type="text"
                                        className="form-control"
                                        placeholder="Nome"
                                        aria-label="Nome"
                                        aria-describedby="basic-addon1"
                                        value={nome}
                                        onChange={(e) => setNome(e.target.value)}
                                    />
                                </div>
                                <div className="input-group mb-3">
                                    <Input
                                        type="text"
                                        className="form-control"
                                        placeholder="Nome social"
                                        aria-label="Nome social"
                                        aria-describedby="basic-addon1"
                                        value={nomeSocial}
                                        onChange={(e) => setNomeSocial(e.target.value)}
                                    />
                                </div>
                                <div className="input-group mb-3">
                                    <InputGroup>
                                        <Input
                                            className="form-control"
                                            placeholder="Email"
                                            aria-label="Email"
                                            aria-describedby="basic-addon1"
                                            value={email}
                                            onChange={handleChangeEmail}
                                            isInvalid={!isValid}
                                        />
                                        {!isValid && (
                                            <FormErrorMessage>
                                                O email deve conter o símbolo '@'.
                                            </FormErrorMessage>
                                        )}
                                    </InputGroup>
                                </div>
                                <FormLabel>Endereço</FormLabel>

                                <Box
                                    display={'flex'}

                                    className="input-group mb-3"
                                >
                                    <Stack direction={'row'} flexWrap={'wrap'}>
                                        <Input
                                            type="string"
                                            className="form-control"
                                            placeholder="Rua"
                                            aria-label="Rua"
                                            aria-describedby="basic-addon1"
                                            width={'25rem'}
                                            value={endereco.rua}
                                            onChange={(e) => {
                                                setEndereco({
                                                    ...endereco,
                                                    rua: e.target.value,
                                                });
                                            }}
                                        />
                                        <Input
                                            type="string"
                                            className="form-control"
                                            placeholder="Número"
                                            aria-label="Número"
                                            aria-describedby="basic-addon1"
                                            width={'8rem'}
                                            value={endereco.numero}
                                            onChange={(e) => {
                                                setEndereco({
                                                    ...endereco,
                                                    numero: e.target.value,
                                                });
                                            }}
                                        />
                                        <Input
                                            type="string"
                                            className="form-control"
                                            placeholder="Bairro"
                                            aria-label="Bairro"
                                            aria-describedby="basic-addon1"
                                            width={'10rem'}
                                            value={endereco.bairro}
                                            onChange={(e) => {
                                                setEndereco({
                                                    ...endereco,
                                                    bairro: e.target.value,
                                                });
                                            }}
                                        />
                                        <Input
                                            type="string"
                                            className="form-control"
                                            placeholder="Cidade"
                                            aria-label="Cidade"
                                            aria-describedby="basic-addon1"
                                            width={'10rem'}
                                            value={endereco.cidade}
                                            onChange={(e) => {
                                                setEndereco({
                                                    ...endereco,
                                                    cidade: e.target.value,
                                                });
                                            }}
                                        />
                                        <Input
                                            type="string"
                                            className="form-control"
                                            placeholder="Estado"
                                            aria-label="Estado"
                                            aria-describedby="basic-addon1"
                                            width={'10rem'}
                                            value={endereco.estado}
                                            onChange={(e) => {
                                                setEndereco({
                                                    ...endereco,
                                                    estado: e.target.value,
                                                });
                                            }}
                                        />
                                        <Input
                                            type="string"
                                            className="form-control"
                                            placeholder="CEP"
                                            aria-label="CEP"
                                            aria-describedby="basic-addon1"
                                            width={'10rem'}
                                            maxLength={9}
                                            value={endereco.codigoPostal}
                                            onChange={(e) => {
                                                setEndereco({
                                                    ...endereco,
                                                    codigoPostal: e.target.value,
                                                });
                                            }}
                                        />
                                        <Input
                                            type="string"
                                            className="form-control"
                                            placeholder="Informações Adicionais"
                                            aria-label="Informações Adicionais"
                                            aria-describedby="basic-addon1"
                                            width={'15rem'}
                                            value={endereco.informacoesAdicionais}
                                            onChange={(e) => {
                                                setEndereco({
                                                    ...endereco,
                                                    informacoesAdicionais: e.target.value,
                                                });
                                            }}
                                        />
                                    </Stack>
                                </Box>

                                <FormLabel>Telefone</FormLabel>
                                <div className="input-group mb-3">
                                    {telefones.map((telefone, index: number) => {
                                        return (
                                            <Stack direction={'row'}>
                                                <Input
                                                    type="tel"
                                                    className="form-control"
                                                    placeholder="DDD"
                                                    aria-label="DDD"
                                                    aria-describedby="basic-addon1"
                                                    width={'20%'}
                                                    value={telefone.ddd}
                                                    id="ddd"
                                                    onChange={(e) => updateArrayTelefone(index, e)}
                                                />
                                                <Input
                                                    type="tel"
                                                    className="form-control"
                                                    placeholder="Número"
                                                    aria-label="Número"
                                                    aria-describedby="basic-addon1"
                                                    id="telefone"
                                                    value={telefone.numero}
                                                    onChange={(e) => updateArrayTelefone(index, e)}
                                                />
                                            </Stack>
                                        )
                                    })}
                                    <IconButton
                                        colorScheme='teal'
                                        aria-label='Call Segun'
                                        size='md'
                                        icon={<AddIcon />}
                                        onClick={(e) => {
                                            let telefone = {
                                                id: 0,
                                                ddd: '',
                                                numero: ''
                                            }
                                            setTelefones(telefones.concat(telefone))
                                        }}
                                    />
                                </div>
                            </form>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={updateCliente} mr={'0.5rem'} colorScheme="green">Editar</Button>
                        <Button onClick={onClose}>Fechar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default EditarCliente


