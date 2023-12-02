import { AddIcon } from "@chakra-ui/icons"
import { Button, Box, Modal, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormLabel, Input, ModalFooter, ModalOverlay, useDisclosure, MenuItem, FormErrorMessage, InputGroup, Stack, IconButton, CloseButton } from "@chakra-ui/react"
import { useState } from "react"
interface Telefone {
    id: number
    ddd: string
    numero: string
}

const EditarCliente = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [nome, setNome] = useState<string>("Lorem");
    const [nomeSocial, setNomeSocial] = useState<string>("Loremzin");
    const [email, setEmail] = useState<string>("lorem@lorem.com");
    const [telefones, setTelefones] = useState<Array<Telefone>>(new Array<Telefone>({ id: 1, ddd: '24', numero: '231442444' }))
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
        // Validar se o email contém '@'
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
                                            value={'Avenida Cesare Monsueto Giulio Lattes'}
                                            aria-describedby="basic-addon1"
                                            width={'25rem'}
                                        />
                                        <Input
                                            type="string"
                                            className="form-control"
                                            placeholder="Número"
                                            value={'1350'}
                                            aria-label="Número"
                                            aria-describedby="basic-addon1"
                                            width={'8rem'}
                                        />
                                        <Input
                                            type="string"
                                            className="form-control"
                                            placeholder="Bairro"
                                            aria-label="Bairro"
                                            value={'Distrito - Eugênio de Melo'}
                                            aria-describedby="basic-addon1"
                                            width={'10rem'}
                                        />
                                        <Input
                                            type="string"
                                            className="form-control"
                                            placeholder="Cidade"
                                            aria-label="Cidade"
                                            value={'São José dos Campos'}
                                            aria-describedby="basic-addon1"
                                            width={'10rem'}
                                        />
                                        <Input
                                            type="string"
                                            className="form-control"
                                            placeholder="Estado"
                                            aria-label="Estado"
                                            value={'SP'}
                                            aria-describedby="basic-addon1"
                                            width={'10rem'}
                                        />
                                        <Input
                                            type="string"
                                            className="form-control"
                                            placeholder="CEP"
                                            aria-label="CEP"
                                            value={'12247-014'}
                                            aria-describedby="basic-addon1"
                                            width={'10rem'}
                                            maxLength={9}
                                        />
                                        <Input
                                            type="string"
                                            className="form-control"
                                            placeholder="Informações Adicionais"
                                            value={'Informações Adicionais'}
                                            aria-label="Informações Adicionais"
                                            aria-describedby="basic-addon1"
                                            width={'15rem'}
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
                                                <CloseButton onClick={(e) => {
                                                    setTelefones(telefones.filter((telefone, i) => i !== index))
                                                }} />
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
                        <Button onClick={onClose} mr={'0.5rem'} colorScheme="green">Editar</Button>
                        <Button onClick={onClose}>Fechar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default EditarCliente


