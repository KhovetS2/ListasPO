import React, { useEffect, useState } from "react";
import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, IconButton, Input, InputGroup, Stack, Tag, TagCloseButton, TagLabel, TagLeftIcon } from "@chakra-ui/react";
import { getAllClientes } from "../services/cliente";
import Cliente from "../models/Cliente";
import Telefone from "../models/Telefone";
import { AddIcon, PhoneIcon } from "@chakra-ui/icons";

type Props = {
    tema: string;
    selectView: Function
};

type EnderecoType = {
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
    codigoPostal: string;
    informacoesAdicionais: string;
    cliente_id: number
}

type TelefoneCadastro = {
    ddd: string
    numero: string
}


const FormularioCadastroCliente: React.FC<Props> = ({ tema, selectView }) => {
    const [nome, setNome] = useState<string>("");
    const [nomeSocial, setNomeSocial] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [ddd, setDdd] = useState<string>("");
    const [numero, setNumero] = useState<string>("");
    const [isValid, setIsValid] = useState(true);
    const [telefones, setTelefones] = useState<Array<TelefoneCadastro>>(new Array<TelefoneCadastro>())


    const [endereco, setEndereco] = useState<EnderecoType>({
        rua: '',
        numero: '',
        bairro: '',
        cidade: '',
        estado: '',
        codigoPostal: '',
        informacoesAdicionais: '',
        cliente_id:0
    })

    const handleChangeEmail = (event: any) => {
        const inputValue = event.target.value;
        setEmail(inputValue);

        setIsValid(inputValue.includes('@'));
    };
    const cadastrarCliente = async (e: React.MouseEvent) => {
        e.preventDefault()
        if (nome.trim() === "" ||
            nomeSocial.trim() === "" ||
            email.trim() === "" ||
            endereco.rua.trim() === "" ||
            endereco.numero.trim() === "" ||
            endereco.bairro.trim() === "" ||
            endereco.cidade.trim() === "" ||
            endereco.estado.trim() === "" ||
            endereco.codigoPostal.trim() === ""
        ) {
            alert("Preencha todos os campos obrigatórios.");
            return;
        }
        const body = {
            nome: nome,
            nomeSocial: nomeSocial,
            email: email,
            endereco: endereco,
            telefones: telefones
        }
        const response = await fetch('http://localhost:8000/clientes/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
        selectView('Clientes', e)
    };


    return (
        <div className="container-fluid">
            <form>
                <div className="input-group mb-3">
                    <FormControl isRequired>
                        <FormLabel>Nome</FormLabel>
                        <Input
                            required
                            type="text"
                            className="form-control"
                            placeholder="Nome"
                            aria-label="Nome"
                            aria-describedby="basic-addon1"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </FormControl>
                </div>
                <div className="input-group mb-3">
                    <FormControl isRequired>
                        <FormLabel>Nome social</FormLabel>
                        <Input
                            required
                            type="text"
                            className="form-control"
                            placeholder="Nome social"
                            aria-label="Nome social"
                            aria-describedby="basic-addon1"
                            value={nomeSocial}
                            onChange={(e) => setNomeSocial(e.target.value)}
                        />
                    </FormControl>
                </div>
                <div className="input-group mb-3">
                    <FormControl isRequired>
                        <FormLabel>Email</FormLabel>
                        <InputGroup>
                            <Input
                                required
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
                    </FormControl>
                </div>
                <FormLabel>
                    <h3>
                        Endereço
                    </h3>
                </FormLabel>

                <Box
                    display={'flex'}

                    className="input-group mb-3"
                >
                    <Stack direction={'row'} flexWrap={'wrap'}>

                        <Box>
                            <FormControl isRequired>
                                <FormLabel>Rua</FormLabel>
                                <Input
                                    required
                                    isRequired
                                    errorBorderColor='red.300'
                                    type="string"
                                    className="form-control"
                                    placeholder="Rua"
                                    aria-label="Rua"
                                    aria-describedby="basic-addon1"
                                    width={'25rem'}
                                    onChange={(e) => {
                                        setEndereco({
                                            ...endereco,
                                            rua: e.target.value,
                                        });
                                    }}
                                />
                            </FormControl>

                        </Box>
                        <Box>
                            <FormControl isRequired>
                                <FormLabel>Número</FormLabel>
                                <Input
                                    required
                                    type="string"
                                    className="form-control"
                                    placeholder="Número"
                                    aria-label="Número"
                                    aria-describedby="basic-addon1"
                                    width={'8rem'}
                                    onChange={(e) => {
                                        setEndereco({
                                            ...endereco,
                                            numero: e.target.value,
                                        });
                                    }}
                                />
                            </FormControl>

                        </Box>
                        <Box>
                            <FormControl isRequired>
                                <FormLabel>Bairro</FormLabel>
                                <Input
                                    required
                                    type="string"
                                    className="form-control"
                                    placeholder="Bairro"
                                    aria-label="Bairro"
                                    aria-describedby="basic-addon1"
                                    width={'10rem'}
                                    onChange={(e) => {
                                        setEndereco({
                                            ...endereco,
                                            bairro: e.target.value,
                                        });
                                    }}
                                />
                            </FormControl>

                        </Box>
                        <Box>
                            <FormControl isRequired>
                                <FormLabel>Cidade</FormLabel>
                                <Input
                                    required
                                    type="string"
                                    className="form-control"
                                    placeholder="Cidade"
                                    aria-label="Cidade"
                                    aria-describedby="basic-addon1"
                                    width={'10rem'}
                                    onChange={(e) => {
                                        setEndereco({
                                            ...endereco,
                                            cidade: e.target.value,
                                        });
                                    }}
                                />
                            </FormControl>
                        </Box>
                        <Box>
                            <FormControl isRequired>
                                <FormLabel>Estado</FormLabel>
                                <Input
                                    required
                                    type="string"
                                    className="form-control"
                                    placeholder="Estado"
                                    aria-label="Estado"
                                    aria-describedby="basic-addon1"
                                    width={'10rem'}
                                    onChange={(e) => {
                                        setEndereco({
                                            ...endereco,
                                            estado: e.target.value,
                                        });
                                    }}
                                />
                            </FormControl>
                        </Box>
                        <Box>
                            <FormControl isRequired>
                                <FormLabel>CEP</FormLabel>
                                <Input
                                    required
                                    type="string"
                                    className="form-control"
                                    placeholder="CEP"
                                    aria-label="CEP"
                                    aria-describedby="basic-addon1"
                                    width={'10rem'}
                                    maxLength={9}
                                    onChange={(e) => {
                                        setEndereco({
                                            ...endereco,
                                            codigoPostal: e.target.value,
                                        });
                                    }}
                                />
                            </FormControl>
                        </Box>
                        <Box>
                            <FormControl>
                                <FormLabel>Informações Adicionais</FormLabel>
                                <Input
                                    type="string"
                                    className="form-control"
                                    placeholder="Informações Adicionais"
                                    aria-label="Informações Adicionais"
                                    aria-describedby="basic-addon1"
                                    width={'15rem'}
                                    onChange={(e) => {
                                        setEndereco({
                                            ...endereco,
                                            informacoesAdicionais: e.target.value,
                                        });
                                    }}
                                />
                            </FormControl>
                        </Box>
                    </Stack>
                </Box>

                <FormLabel><h3>Telefone</h3></FormLabel>
                <Flex className="input-group mb-3" flexDirection={'column'} gap={'0.7rem'}>
                    <Stack flexDirection={'row'} flexWrap={'wrap'}>
                        <Input
                            type="tel"
                            className="form-control"
                            placeholder="DDD"
                            aria-label="DDD"
                            aria-describedby="basic-addon1"
                            width={'20%'}
                            value={ddd}
                            onChange={(e) => setDdd(e.target.value)}
                        />
                        <Input
                            type="tel"
                            className="form-control"
                            placeholder="Número"
                            aria-label="Número"
                            aria-describedby="basic-addon1"
                            w={'60%'}
                            value={numero}
                            onChange={(e) => setNumero(e.target.value)}
                        />
                        <IconButton
                            colorScheme='teal'
                            aria-label='Call Segun'
                            size='md'
                            icon={<AddIcon />}
                            onClick={(e) => {
                                let telefone = {
                                    ddd: ddd,
                                    numero: numero
                                }
                                if (ddd.length !== 0 && numero.length !== 0) {
                                    setTelefones(telefones.concat(telefone))
                                    setDdd('')
                                    setNumero('')
                                }
                            }}
                        />
                    </Stack>
                    <Stack flexDirection={'row'} flexWrap={'wrap'}>
                        {telefones.map((telefone) => {
                            return (
                                <Tag
                                    size={'md'}
                                    key={telefone.ddd + telefone.numero}
                                    borderRadius='full'
                                    variant='solid'
                                    colorScheme='green'
                                >
                                    <TagLeftIcon boxSize='12px' as={PhoneIcon} />
                                    <TagLabel>({telefone.ddd}){telefone.numero}</TagLabel>
                                    <TagCloseButton />
                                </Tag>
                            )
                        })
                        }
                    </Stack>
                </Flex>
                <div className="input-group mb-3">
                    <Button
                        colorScheme="green"
                        onClick={cadastrarCliente}
                    >
                        Cadastrar
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default FormularioCadastroCliente;
